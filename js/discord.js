// =============================================================
// js/discord.js — load Discord server widget stats
// =============================================================

function fmt(n) { return Number(n).toLocaleString(); }

export async function loadDiscord() {
  const { discordServerId, discordInviteUrl } = window.__TWEAKS;

  const status = document.getElementById("discord-status");
  const invite = document.getElementById("dc-invite");

  // Wire up invite button
  if (discordInviteUrl) { invite.href = discordInviteUrl; invite.target = "_blank"; }
  else                  { invite.href = "#"; }

  // No server ID → show placeholder counts
  if (!discordServerId) {
    document.getElementById("dc-members").textContent = "2,418";
    document.getElementById("dc-online").textContent  = "86";
    status.className   = "discord-status";
    status.textContent = "demo counts · add server id in Tweaks for live data";
    return;
  }

  try {
    const res  = await fetch(`https://discord.com/api/guilds/${encodeURIComponent(discordServerId)}/widget.json`);
    if (!res.ok) throw new Error("discord " + res.status);
    const data = await res.json();

    // Member / online counts
    document.getElementById("dc-members").textContent = fmt(data.presence_count || 0);
    document.getElementById("dc-online").textContent  = fmt(
      (data.members || []).filter(m => m.channel_id).length
    );

    // Labels
    const membersLabel = document.querySelector("#dc-members ~ .l, #dc-members + .l");
    if (membersLabel) membersLabel.textContent = "online now";
    const onlineLabel = document.getElementById("dc-online")?.parentElement?.querySelector(".l");
    if (onlineLabel)  onlineLabel.textContent  = "voice/text";

    // Channel name
    if (data.name) {
      document.getElementById("dc-channel").textContent =
        "# " + data.name.toLowerCase().replace(/\s+/g, "-");
    }

    // Replace mock messages with live online members
    const msgs = document.getElementById("dc-msgs");
    if (Array.isArray(data.members) && data.members.length) {
      msgs.innerHTML = data.members.slice(0, 5).map(m => `
        <div class="msg">
          <div class="av" style="background:linear-gradient(135deg,#ffd6e3,#c9b0f0);"></div>
          <div>
            <b>${(m.username || "member").replace(/</g, "&lt;")}</b>
            <span>• ${m.status || "online"}</span>
          </div>
        </div>`).join("");
    }

    // Prefer widget invite if no custom one configured
    if (data.instant_invite && !discordInviteUrl) {
      invite.href   = data.instant_invite;
      invite.target = "_blank";
    }

    status.className   = "discord-status live";
    status.textContent = "live from discord widget";
  } catch (err) {
    document.getElementById("dc-members").textContent = "—";
    document.getElementById("dc-online").textContent  = "—";
    status.className   = "discord-status";
    status.textContent = "couldn't reach server widget (make sure it's enabled)";
  }
}
