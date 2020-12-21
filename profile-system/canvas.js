// customizable user profile card
const { createCanvas, loadImage, Canvas } = require("canvas");
const { MessageAttachment } = require("discord.js");
const config = require('../config.json')

const imgSchema = require('../schemas/imgSchema')
const fSchema = require('../schemas/factionSchema');
const mongoose = require("../mongoose");

module.exports = {

  async imagine(message, member) {

    return await mongoose().then(async (mongoose) => {
      try {

        message.channel.startTyping();
        const target = member;
        const guildID = message.guild.id;
        const userID = target.id;

        // get user's Duelist Kingdom RPG data if applicable
        const userData = await fSchema.findOne({
          guildID,
          userID,
        })
        if (userData) {
          var level = userData.level
          var userClass = userData.class
          var faction = userData.faction
          var xp = userData.xp
          var points = userData.points
          var fame = userData.fame
          console.log('userData processed!')
        } else {
          console.log("no userData")
        }

        // get user's configured profile information
        const userimgData = await imgSchema.findOne({
          guildID,
          userID,
        })
        if (userimgData) {
          var description = userimgData.description
          var description2 = userimgData.description2
          var description3 = userimgData.description3
          var BG = userimgData.background
          var BGcolor = userimgData.BGcolor
          console.log('userImgData processed!')
        } else {
          var description = "description 1"
          var description2 = "description 2"
          var description3 = "description 3"
          var BG = "https://i.imgur.com/PBmXfo8.jpeg"
          var BGcolor = "#edeadd"

        }

        const pIcon = await loadImage('profile-system/image/meso.png');
        const fIcon = await loadImage('profile-system/image/fame.png')

        const avatar = await loadImage(
          member.user.displayAvatarURL({ format: "jpg" })
        );

        // load the different obtainable user badges
        let badge1 = await loadImage(
          `profile-system/image/badges/league.png`
        );
        let arkBadge = await loadImage(
          "https://webusstatic.yo-star.com/ark_us_web/mobile/img/logo03.fbaed501.png"
        );
        let acBadge = await loadImage(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Animal_Crossing_Leaf.png/250px-Animal_Crossing_Leaf.png"
        );
        let sbBadge = await loadImage(
          "profile-system/image/badges/smashball.png"
        );
        let owBadge = await loadImage(
          "profile-system/image/badges/shooty.png"
        );
        let pBadge = await loadImage(
          "profile-system/image/badges/pb.png"
        );
        let exBadge = await loadImage(
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_large.png?v=1571606036"
        );
        let nitroBadge = await loadImage(
          "profile-system/image/badges/rupee.png"
        );
        let roseBadge = await loadImage(
          "profile-system/image/badges/rose.png"
        );
        let dsBadge = await loadImage(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Kame-sennin_mark.svg/1200px-Kame-sennin_mark.svg.png"
        );
        let background = await loadImage(`${BG}`);

        // build the canvas (width, height) in pixels
        const canvas = createCanvas(1000, 405, "png");
        const ctx = canvas.getContext("2d");

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
        ctx.strokeText(`Level ${level} ` + userClass + ` of ` + faction, 300, 135, 640);
        ctx.globalCompositeOperation = "darker";
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 6;
        ctx.fillText(`Level ${level} ` + userClass + ` of ` + faction, 300, 135, 640);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowcolor = "transparent";
        ctx.globalCompositeOperation = "source-over";

        // dnyamic xp bar
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;
        ctx.strokeRect(270, 150, 630, 10);
        ctx.strokeRect();

        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#d9ae6a";
        ctx.fillRect(270, 150, 630, 10)
        ctx.fill();

        // fills up based on how much xp the user has obtained
        ctx.fillStyle = "#fff242";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(270, 150, ((100 / (level * 100 * level)) * xp) * 6.3, 10);
        ctx.fill();
        ctx.globalAlpha = 1;

        // descr 1
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText(description, 300, 240, 560);

        //descr 2
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText(description2, 300, 290, 560);

        // descr 3

        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "left";
        ctx.fillText(description3, 300, 340, 560);

        // currency & fame
        ctx.font = "17px sans-serif";
        ctx.fillstyle = "#000000";
        ctx.textAlign = "left"
        ctx.fillText(`:  ${points}`, 315, 190)
        ctx.drawImage(pIcon, 300, 173, 21, 21);

        ctx.font = "17px sans-serif";
        ctx.fillstyle = "#000000";
        ctx.textAlign = "left"
        ctx.fillText(`:  ${fame}`, 405, 190)
        ctx.drawImage(fIcon, 400, 169, 14, 28);

        // username title
        ctx.lineWidth = 5;
        ctx.font = await this.applyText(canvas, member.displayName);
        ctx.strokeText(member.displayName, 300, 95, 400);
        ctx.fillStyle = BGcolor;
        ctx.fillText(member.displayName, 300, 95, 400);

        // avatar thumbnail
        ctx.shadowColor = "#9969e0";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 7;
        ctx.shadowOffsetY = 6;
        ctx.globalAlpha = 0.0;
        ctx.strokeRect(15, 15, 220, 220);
        ctx.globalAlpha = 1.0;
        ctx.drawImage(avatar, 25, 25, 200, 200);
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // faction emblem
        if (
          faction === `Ra's Giga Chickens`
        ) {
          let raBadge = await loadImage('profile-system/image/smraB.png');
          ctx.globalAlpha = 1.0;
          ctx.drawImage(raBadge, 865, 25, 95, 95);
        }

        else if (
          faction === `Slifer's Production Crew`
        ) {
          let sfBadge = await loadImage('profile-system/image/smsliferB.png');
          ctx.globalAlpha = 1.0;
          ctx.drawImage(sfBadge, 865, 25, 95, 95);
        }

        else if (
          faction === `Obelisk's Tormentors`
        ) {
          let obBadge = await loadImage('profile-system/image/smobeliskB.png');
          ctx.globalAlpha = 1.0;
          ctx.drawImage(obBadge, 865, 25, 95, 95);
        }

        // badge 1
        if (
          member.roles.cache.has(config.tftRole) ||
          member.roles.cache.has(config.lolRole)
        ) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(badge1, 32, 238, 38, 38);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "#5c5c63";
          ctx.lineWidth = 0.2;
          ctx.globalAlpha = 0.6;
          ctx.arc(52, 260, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 2
        if (member.roles.cache.has(config.dbfzRole)) {
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
          ctx.arc(127, 260, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 3
        if (
          member.roles.cache.has(config.bRole) ||
          member.roles.cache.has(config.animeRole)
        ) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(acBadge, 182, 238, 38, 38);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "#5c5c63";
          ctx.lineWidth = 0.2;
          ctx.globalAlpha = 0.6;
          ctx.arc(202, 260, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 4
        if (member.roles.cache.has(config.arkRole)) {
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
          ctx.arc(52, 315, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 5
        if (member.roles.cache.has(config.smashRole)) {
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
          ctx.arc(127, 315, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 6
        if (member.roles.cache.has(config.shootRole)) {
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
          ctx.arc(202, 315, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 7
        if (member.roles.cache.has(config.partyRole)) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(exBadge, 32, 348, 40, 40);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "#5c5c63";
          ctx.lineWidth = 0.2;
          ctx.globalAlpha = 0.6;
          ctx.arc(52, 370, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 8
        if (member.roles.cache.has(config.nitroRole)) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(nitroBadge, 117, 348, 25, 40);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "#5c5c63";
          ctx.lineWidth = 0.2;
          ctx.globalAlpha = 0.6;
          ctx.arc(127, 370, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        // badge 9
        if (member.roles.cache.has(config.botRole)) {
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
          ctx.arc(202, 370, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        const duelistCard = new MessageAttachment(
          canvas.toBuffer(),
          "userprofile.png"
        );

        message.channel.send(duelistCard);
        return message.channel.stopTyping();

      } catch (e) {
        console.log(e)
        return message.channel.stopTyping();

      }
    })
  },

  // limit and scale text character length
  applyText: (canvas, text) => {
    const ctx = canvas.getContext("2d");

    let fontSize = 60;

    do {
      ctx.font = `${(fontSize -= 10)}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
  },

  // adjust position of user background to fit to the canvas
  bgMOD: (ctx, background, x, y, w, h, offsetX, offsetY) => {
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
