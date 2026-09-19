const Newsletter = require("../models/Newsletter");
const Subscriber = require("../models/Subscriber");
const { sendEmail } = require("./resendService");

/**
 * Create a newsletter draft
 */
async function createDraft(adminId, data) {
    const newsletter = await Newsletter.create({
        title: data.title,
        subject: data.subject,
        bodyHTML: data.bodyHTML,
        bodyText: data.bodyText || "",
        segment: data.segment || "all",
        featuredImage: data.featuredImage || null,
        status: "draft",
        createdBy: adminId,
    });
    return newsletter;
}

/**
 * Update draft (only if status is draft)
 */
async function updateDraft(id, updates, adminId) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");
    if (newsletter.status !== "draft") throw new Error("Only draft newsletters can be edited");

    const allowed = ["title", "subject", "bodyHTML", "bodyText", "segment", "featuredImage"];
    allowed.forEach((key) => {
        if (updates[key] !== undefined) newsletter[key] = updates[key];
    });
    await newsletter.save();
    return newsletter;
}

/**
 * Preview newsletter HTML with sample data
 */
async function preview(id) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");

    // Simple sample substitution for preview
    const sampleData = {
        name: "Supporter",
        region: newsletter.segment === "all" ? "All Regions" : newsletter.segment,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    };

    let html = newsletter.bodyHTML || "";
    html = html.replace(/\{\{name\}\}/gi, sampleData.name);
    html = html.replace(/\{\{region\}\}/gi, sampleData.region);
    html = html.replace(/\{\{date\}\}/gi, sampleData.date);

    return html;
}

/**
 * Send newsletter immediately to subscribers
 */
async function sendNow(id, adminId) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");
    if (newsletter.status !== "draft") throw new Error("Only drafts can be sent");

    const filter = { status: "active" };
    if (newsletter.segment !== "all") {
        filter.tags = newsletter.segment;
    }

    const subscribers = await Subscriber.find(filter).lean();
    const recipientEmails = subscribers.map((s) => s.email);
    const recipientCount = recipientEmails.length;

    if (recipientCount === 0) {
        newsletter.status = "sent";
        newsletter.sentAt = new Date();
        newsletter.sentCount = 0;
        await newsletter.save();
        return { sentCount: 0, message: "No subscribers matching segment" };
    }

    const result = await sendEmail({
        to: recipientEmails,
        subject: newsletter.subject,
        html: newsletter.bodyHTML,
        text: newsletter.bodyText || newsletter.bodyHTML.replace(/<[^>]*>/g, ""),
    });

    if (result.success) {
        newsletter.status = "sent";
        newsletter.sentAt = new Date();
        newsletter.sentCount = recipientCount;
        await newsletter.save();
        return { sentCount: recipientCount, result };
    } else {
        newsletter.status = "failed";
        await newsletter.save();
        throw new Error(result.error || "Send failed");
    }
}

/**
 * Schedule newsletter (Phase 2)
 */
async function scheduleNewsletter(id, scheduledAt) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");
    if (newsletter.status !== "draft") throw new Error("Only drafts can be scheduled");

    newsletter.status = "scheduled";
    newsletter.scheduledAt = new Date(scheduledAt);
    await newsletter.save();
    return newsletter;
}

/**
 * Cancel schedule (Phase 2)
 */
async function cancelSchedule(id) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");
    if (newsletter.status !== "scheduled") throw new Error("Only scheduled newsletters can be cancelled");

    newsletter.status = "draft";
    newsletter.scheduledAt = null;
    await newsletter.save();
    return newsletter;
}

/**
 * Get newsletter stats
 */
async function getStats(id) {
    const newsletter = await Newsletter.findById(id).lean();
    if (!newsletter) throw new Error("Newsletter not found");
    return {
        title: newsletter.title,
        status: newsletter.status,
        sentCount: newsletter.sentCount || 0,
        openRate: newsletter.openRate || null,
        clickRate: newsletter.clickRate || null,
        sentAt: newsletter.sentAt,
        segment: newsletter.segment,
    };
}

/**
 * Unsubscribe by email
 */
async function unsubscribe(email) {
    const subscriber = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (!subscriber) return { unsubscribed: false, message: "Email not found in list" };

    subscriber.status = "unsubscribed";
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return { unsubscribed: true, message: "You have been unsubscribed successfully." };
}

/**
 * List all newsletters
 */
async function listNewsletters(query = {}) {
    const filter = {};
    if (query.status) filter.status = query.status;
    if (query.segment) filter.segment = query.segment;

    return await Newsletter.find(filter).sort({ createdAt: -1 }).lean();
}

/**
 * Delete draft only
 */
async function deleteNewsletter(id) {
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) throw new Error("Newsletter not found");
    if (newsletter.status !== "draft") throw new Error("Only drafts can be deleted");
    await Newsletter.findByIdAndDelete(id);
    return true;
}

module.exports = {
    createDraft,
    updateDraft,
    preview,
    sendNow,
    scheduleNewsletter,
    cancelSchedule,
    getStats,
    unsubscribe,
    listNewsletters,
    deleteNewsletter,
};