// imaging module
const { createCanvas, loadImage, Canvas } = require("canvas");
const { MessageAttachment } = require("discord.js");
const Discord = require("discord.js");
const profPars = require("../img-counter");
const prefix = "$";

module.exports = {
  async imagine(bot, message, member) {
    // try {
    message.channel.startTyping();
    const target = member; //message.mentions.users.first() || message.author;
    const targetID = target.id;

    const guildID = message.guild.id;
    const userID = target.id;

    const description = await profPars.imgPars(guildID, userID);
    const description2 = await profPars.imgPars2(guildID, userID);
    const description3 = await profPars.imgPars3(guildID, userID);
    const BG = await profPars.BGPars(guildID, userID);
    const BGcolor = await profPars.BGcolorPars(guildID, userID);

    const canvas = createCanvas(1000, 405); // (width, height) in pixels
    const ctx = canvas.getContext("2d");

    let background = await loadImage(`${BG}`);
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#00FFFF");
    gradient.addColorStop(0.5, "#9969e0");
    gradient.addColorStop(1.0, "#FF0000");

    var offsetX = 0.5;
    var offsetY = 0.5;
    this.bgMOD(
      ctx,
      background,
      0,
      0,
      canvas.width,
      canvas.height,
      offsetX,
      offsetY
    );



    // description back panel
    var bprX = 130;
    var bprY = 210;
    var bprW = 760;
    var bprH = 150;
    var cornerRadius = 5;

    var bprX = 270;
    var bprY = 210;
    var bprW = 630;
    var bprH = 150;
    var cornerRadius = 5;

    ctx.lineJoin = "round";
    ctx.lineWidth = cornerRadius;
    ctx.fillStyle = BGcolor;
    ctx.globalAlpha = 0.6;
    ctx.strokeRect(
      bprX + cornerRadius / 2,
      bprY + cornerRadius / 2,
      bprW - cornerRadius,
      bprH - cornerRadius
    );
    ctx.fillRect(
      bprX + cornerRadius / 2,
      bprY + cornerRadius / 2,
      bprW - cornerRadius,
      bprH - cornerRadius
    );
    ctx.globalAlpha = 1.0;

    // role subheader
    ctx.font = "28px sans-serif";
    ctx.lineWidth = "3";
    ctx.strokeText(member.roles.highest.name, 300, 160, 640);
    ctx.globalCompositeOperation = "darker";
    if (member.roles.highest.name === "Judas of KPOP") {
      ctx.fillStyle = gradient;
    } else if (member.roles.highest.name === "Smash Brothers") {
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#008000";
    } else if (member.roles.highest.name === "Bubble Blowing Double Babies") {
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#FF0000";
    } else if (member.roles.highest.name === "Literally SoCal") {
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#FFB6C1";
    } else if (member.roles.highest.name === "Saucy Bois and Co") {
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#00FFFF";
    } else if (
      member.roles.highest.name ===
      "Expat Excommunicado Koryan Peepo V.2 based on a Book by Sapphire"
    ) {
      ctx.fillStyle = "#99692f";
      ctx.shadowColor = "#99692f";
    } else {
      ctx.fillStyle = gradient;
    }
    ctx.shadowBlur = 6;
    ctx.fillText(member.roles.highest.name, 300, 160, 640);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.shadowcolor = "transparent";
    ctx.globalCompositeOperation = "source-over";

    var descriptor1 = description;
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText(descriptor1, 300, 240, 560); //descr 1

    var descriptor2 = description2;
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText(descriptor2, 300, 290, 560); // descr 2

    var descriptor3 = description3;
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText(descriptor3, 300, 340, 560); // descr 3

    // username title
    ctx.font = module.exports.applyText(canvas, member.displayName);
    ctx.strokeText(member.displayName, 300, 120, 400);
    ctx.fillStyle = BGcolor;
    ctx.fillText(member.displayName, 300, 120, 400);

    if (member.roles.highest.name === "Judas of KPOP") {
      ctx.shadowColor = "#e1e384";
    } else if (member.roles.highest.name === "Smash Brothers") {
      ctx.shadowColor = "#008000";
    } else if (member.roles.highest.name === "Bubble Blowing Double Babies") {
      ctx.shadowColor = "#FF0000";
    } else if (member.roles.highest.name === "Literally SoCal") {
      ctx.shadowColor = "#FFB6C1";
    } else if (member.roles.highest.name === "Saucy Bois and Co") {
      ctx.shadowColor = "#00FFFF";
    } else if (
      member.roles.highest.name ===
      "Expat Excommunicado Koryan Peepo V.2 based on a Book by Sapphire"
    ) {
      ctx.shadowColor = "#99692f";
    } else {
      ctx.shadowColor = "#9969e0";
    }
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 7;
    ctx.shadowOffsetY = 6;
    ctx.globalAlpha = 0.0;
    ctx.strokeRect(15, 15, 220, 220);
    ctx.globalAlpha = 1.0;
    const avatar = await loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200); // avatar thumbnail
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    let badge1 = await loadImage(
      `https://raw.githubusercontent.com/mmtrt/leagueoflegends/master/snap/gui/leagueoflegends.png`
    );
    let arkBadge = await loadImage(
      "https://webusstatic.yo-star.com/ark_us_web/mobile/img/logo03.fbaed501.png"
    );
    let acBadge = await loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Animal_Crossing_Leaf.png/250px-Animal_Crossing_Leaf.png"
    );
    let sbBadge = await loadImage(
      "https://img.pngio.com/smash-ball-smashwiki-the-super-smash-bros-wiki-super-smash-ball-png-250_243.png"
    );
    let owBadge = await loadImage(
      "https://image.flaticon.com/icons/png/512/2394/2394697.png"
    );
    let pBadge = await loadImage(
      "https://pngimg.com/uploads/pokeball/pokeball_PNG21.png"
    );
    let exBadge = await loadImage(
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_large.png?v=1571606036"
    );
    let nitroBadge = await loadImage(
      "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/8f/TLoZ_Series_Green_Rupee_Artwork.png/revision/latest/scale-to-width-down/167?cb=20171012171259"
    );
    let roseBadge = await loadImage(
     "https://i.imgur.com/6hajyZc.png"
    );
    let dsBadge = await loadImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kame-sennin_mark.svg/1200px-Kame-sennin_mark.svg.png"
    );

    // League Badge
    if (
      member.roles.cache.has("512113720525193268") ||
      member.roles.cache.has("731041406306746369")
    ) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(badge1, 32, 238, 38, 38);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(52, 260, 8, 0, 2 * Math.PI); // badge 1
      ctx.fill();
    }

    if (member.roles.cache.has("568334391357734912")) {
      ctx.globalAlpha = 1.0
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "#faca61";
      ctx.globalAlpha = 1.0;
      ctx.drawImage(dsBadge, 110, 238, 38, 38);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(127, 260, 8, 0, 2 * Math.PI); // badge 2
      ctx.fill();
    }

    if (
      member.roles.cache.has("269782226835603457") ||
      member.roles.cache.has("613158694342885428")
    ) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(acBadge, 182, 238, 38, 38);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(202, 260, 8, 0, 2 * Math.PI); // badge 3
      ctx.fill();
    }

    // Arknights Badge
    if (member.roles.cache.has("715362163526467614")) {
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "#596ebd";
      ctx.globalAlpha = 1.0;
      ctx.drawImage(arkBadge, 32, 293, 38, 38);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(52, 315, 8, 0, 2 * Math.PI); // badge 4
      ctx.fill();
    }

    // Smash Bros badge
    if (member.roles.cache.has("269752447151505411")) {
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "#FFB6C1";
      ctx.globalAlpha = 1.0;
      ctx.drawImage(sbBadge, 80, 260, 96, 96);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(127, 315, 8, 0, 2 * Math.PI); // badge 5
      ctx.fill();
    }

    // Shooter Badge
    if (member.roles.cache.has("736475181694058547")) {
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "#FF0000";
      ctx.globalAlpha = 1.0;
      ctx.drawImage(owBadge, 182, 293, 38, 38);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(202, 315, 8, 0, 2 * Math.PI); // badge 6
      ctx.fill();
    }

    // expat badge
    if (member.roles.cache.has("754168339508625428")) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(exBadge, 32, 348, 40, 40);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(52, 370, 8, 0, 2 * Math.PI); // badge 7
      ctx.fill();
    }

    // Nitro Badge
    if (member.roles.cache.has("701702537497149471")) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(nitroBadge, 117, 348, 25, 40);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(127, 370, 8, 0, 2 * Math.PI); // badge 8
      ctx.fill();
    }

    // Bot Badge
    if (member.roles.cache.has("271544642816835586")) {
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = "#9969e0";
      ctx.globalAlpha = 1.0;
      ctx.drawImage(roseBadge, 182, 348, 40, 40);
    } else {
      ctx.beginPath();
      ctx.fillStyle = "#5c5c63";
      ctx.lineWidth = 0.2;
      ctx.globalAlpha = 0.6;
      ctx.arc(202, 370, 8, 0, 2 * Math.PI); // badge 9
      ctx.fill();
    }

    const duelistCard = new MessageAttachment(
      canvas.toBuffer(),
      "test-image.png"
    );

    message.channel.send(duelistCard);
    // } catch {
    //   message.channel.send(
    //     `Error. You likely do not have a profile yet, please use **${prefix}test** to reset parameters.`
    //   );
    // }
    message.channel.stopTyping();
  },

  async applyText(canvas, text) {
    const ctx = canvas.getContext("2d");

    let fontSize = 60;

    do {
      ctx.font = `${(fontSize -= 10)}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
  },

  async bgMOD(ctx, background, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
    }

    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var BGw = background.width,
      BGh = background.height,
      r = Math.min(w / BGw, h / BGh),
      newW = BGw * r,
      newH = BGh * r,
      cx,
      cy,
      cw,
      ch,
      ar = 1;

    if (newW < w) ar = w / newW;
    if (Math.abs(ar - 1) < 1e-14 && newH < h) ar = h / newH;
    newW *= ar;
    newH *= ar;

    cw = BGw / (newW / w);
    ch = BGh / (newH / h);

    cx = (BGw - cw) * offsetX;
    cy = (BGh - ch) * offsetY;

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > BGw) cw = BGw;
    if (ch > BGh) ch = BGh;

    ctx.drawImage(background, cx, cy, cw, ch, x, y, w, h);
  },
};
