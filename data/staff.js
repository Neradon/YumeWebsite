// =============================================================
// data/staff.js — all staff records and role label map
// =============================================================

export const STAFF = {
  maids: [
    {
      name: "Himari", handle: "himari ♡", pronouns: "she / her", debut: "Mar 2023",
      drink: "strawberry latte", bday: "April 7", shifts: "Tue · Fri · Sat",
      tags: ["tsundere", "loves cats", "calligraphy"], spec: "omu-rice art",
      bio: "Your captain on shift. Will draw a tiny bunny on your omu-rice if you ask very nicely. Do not ask her about her fantasy novel unless you have four hours.",
      quote: "Welcome home, my darling~ I kept your seat warm.", status: "on",
    },
    {
      name: "Mochi", handle: "mochi 🍡", pronouns: "she / they", debut: "Jul 2024",
      drink: "peach oolong", bday: "August 22", shifts: "Wed · Sat · Sun",
      tags: ["baker", "sleepy", "always cold"], spec: "bear pancakes",
      bio: "The softest voice in the cafe. Makes the pancakes so fluffy the regulars have a pool on how many can stack before one topples.",
      quote: "shh~ i saved the last strawberry for you", status: "on",
    },
    {
      name: "Lulu", handle: "lulu ✦", pronouns: "she / her", debut: "Nov 2024",
      drink: "lavender milk tea", bday: "December 1", shifts: "Mon · Thu · Sun",
      tags: ["stargazer", "tarot", "gamer"], spec: "magic soda ritual",
      bio: "Will do a three-card pull at your table with the magic soda. The reading is maybe 60% accurate but always dramatic.",
      quote: "the cards said you'd come in tonight ♡", status: "off",
    },
    {
      name: "Suzu", handle: "suzu ♬", pronouns: "she / her", debut: "Jan 2025",
      drink: "iced matcha", bday: "May 18", shifts: "Fri · Sat",
      tags: ["dancer", "k-pop", "loud"], spec: "birthday performances",
      bio: "If it's your birthday, brace yourself. Suzu will make it a whole production, complete with choreography she invented this afternoon.",
      quote: "happpy birthdayyy to youuu~~ ♡♡♡", status: "on",
    },
    {
      name: "Yui", handle: "yui 🫧", pronouns: "she / her", debut: "Sep 2022",
      drink: "earl grey, hot", bday: "October 3", shifts: "Mon · Tue · Wed",
      tags: ["senpai", "bookish", "plants"], spec: "afternoon tea",
      bio: "The longest-serving maid. Knows every regular's usual before they sit down. Do not be late for your Tuesday tea.",
      quote: "your table, as always, is waiting ♡", status: "off",
    },
  ],

  butlers: [
    {
      name: "Sebastian", handle: "sir sebastian", pronouns: "he / him", debut: "Feb 2023",
      drink: "black coffee, no sugar", bday: "January 12", shifts: "Tue · Thu · Sat",
      tags: ["head butler", "violin", "insomniac"], spec: "high tea service",
      bio: "Head butler. Can pour tea from the elbow and has strong opinions about scone clotted-cream order (cream first, fight him).",
      quote: "Welcome home, sir. The usual?", status: "on",
    },
    {
      name: "Akio", handle: "akio ♤", pronouns: "he / they", debut: "May 2024",
      drink: "whisky highball", bday: "March 3", shifts: "Fri · Sat",
      tags: ["jazz", "piano", "flirt"], spec: "late-night sets",
      bio: "Plays the piano on Friday nights. Will take a request. Will remember you requested it.",
      quote: "any song tonight, darling? on the house.", status: "on",
    },
    {
      name: "Ren", handle: "ren ✦", pronouns: "he / him", debut: "Oct 2024",
      drink: "espresso martini", bday: "July 28", shifts: "Wed · Fri",
      tags: ["sommelier", "literature", "cat person"], spec: "wine pairings",
      bio: "Will tell you what to drink with your dessert and be correct about it. Has a cat named Dostoevsky.",
      quote: "might I suggest the rosé this evening?", status: "off",
    },
    {
      name: "Hayato", handle: "hayato 🍂", pronouns: "he / him", debut: "Mar 2025",
      drink: "hojicha latte", bday: "November 14", shifts: "Mon · Thu · Sun",
      tags: ["barista", "pastry", "quiet"], spec: "latte art",
      bio: "Quietly the best barista on the floor. Latte art is a love language. Rarely speaks first, worth the wait.",
      quote: "...your rosetta, madam.", status: "on",
    },
    {
      name: "Kai", handle: "kai ☾", pronouns: "he / they", debut: "Aug 2023",
      drink: "yuzu soda", bday: "June 6", shifts: "Sat · Sun",
      tags: ["magician", "mixology", "sparkle"], spec: "table-side flair",
      bio: "Will make a cocktail appear at your table you didn't order. Don't worry, it's for you. He saw the day you were having.",
      quote: "for you — no no, i insist. ♡", status: "off",
    },
  ],

  hosts: [
    {
      name: "Tsuki", handle: "tsuki ★", pronouns: "she / her", debut: "Jun 2023",
      drink: "champagne, always", bday: "February 14", shifts: "Fri · Sat · Sun",
      tags: ["karaoke queen", "glitter", "drama"], spec: "birthday tables",
      bio: "If the energy in the room just shifted, Tsuki walked in. Absolute icon. Do not sit near her unless you want to be on camera.",
      quote: "tonight? tonight we're making memories, baby.", status: "on",
    },
    {
      name: "Aoi", handle: "aoi ✦", pronouns: "they / them", debut: "Apr 2024",
      drink: "blue lagoon", bday: "September 9", shifts: "Thu · Sat",
      tags: ["dj", "fashion", "night owl"], spec: "dance floor",
      bio: "Runs the late-night playlist. Outfit changes twice a night and the second one is always better.",
      quote: "we're gonna need a bigger song.", status: "on",
    },
    {
      name: "Kira", handle: "kira ♡", pronouns: "she / her", debut: "Dec 2024",
      drink: "pink gin fizz", bday: "April 30", shifts: "Fri · Sat",
      tags: ["comedian", "sharpshooter wit", "listener"], spec: "first-timers",
      bio: "The one you want for your first visit. She'll put you at ease in thirty seconds and roast you in thirty-one.",
      quote: "okay new friend — tell me everything.", status: "off",
    },
    {
      name: "Rei", handle: "rei ☆", pronouns: "he / him", debut: "Jul 2022",
      drink: "old fashioned", bday: "October 21", shifts: "Wed · Fri · Sun",
      tags: ["host captain", "tall", "bookish"], spec: "conversation",
      bio: "Head host. Will remember a story you told him eight months ago and ask you how it ended.",
      quote: "so — did you finally tell her?", status: "on",
    },
    {
      name: "Nao", handle: "nao 🎐", pronouns: "she / they", debut: "Feb 2025",
      drink: "sakura spritz", bday: "March 27", shifts: "Sat · Sun",
      tags: ["singer", "soft", "bright"], spec: "duets",
      bio: "Will sing a duet with you. Will make it sound like you're also good. A true gift.",
      quote: "you pick the song, i'll match your key ♡", status: "on",
    },
  ],
};

/** Human-readable role label shown in the staff modal */
export const ROLE_LABEL = {
  maids:   "maid ♡",
  butlers: "butler ✦",
  hosts:   "host ★",
};
