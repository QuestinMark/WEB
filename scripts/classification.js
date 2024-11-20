/* Copyright 2021 VMware, Inc. All rights reserved. -- VMware Confidential */

// Localization not required.
const classificationLabels = {
    none: "",
    unclassified: "UNCLASSIFIED",
    controlled: "CONTROLLED",
    cui: "CUI",
    confidential: "CONFIDENTIAL",
    secret: "SECRET//NOFORN",
    topsecret: "TOP SECRET",
    topsecret_sci: "TOP SECRET//SCI",
 };
 
 (() => {
    window.addEventListener("DOMContentLoaded", () => {
       const classificationBanner = this.document.getElementById(
          "classificationBanner"
       );
       const replaceCssClass = (cssClass = "none") => {
          classificationBanner.classList.replace("none", cssClass);
       };
 
       this.fetch("classification.json", {
          headers: {
             Accept: "application/json",
          },
       }).then((response) => {
          response.json().then((classificationJson) => {
             if (classificationJson && classificationJson.level) {
                const level = classificationJson.level.toLowerCase();
                replaceCssClass(level);
                classificationBanner.innerHTML = classificationLabels[level];
             }
          });
       });
    });
 })(); // Self-Invoking