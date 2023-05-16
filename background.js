//This script runs in the background
//It can be used to send messages to the content script
console.log("background.js loaded");

const socialMediaSites = ['www.facebook.com', 'www.twitter.com', 'www.instagram.com', 'www.linkedin.com'];

const affirmations = ['You are doing great!', 'Keep it up!', 'You are awesome!'];
const negativeMessages = ['Get off social media!', 'You should be working!', 'Stop wasting time!'];

let timer = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && socialMediaSites.includes(new URL(tab.url).hostname)) {
    const message = negativeMessages[Math.floor(Math.random() * negativeMessages.length)];
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon128.png',
      title: 'Angry Grandma',
      message: message
    });

    if (timer) {
      clearTimeout(timer);
    }
    let timeSpent = 0;
    timer = setInterval(() => {
      timeSpent++;
      if (timeSpent > 10) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/icon128.png',
          title: 'Angry Grandma',
          message: 'Charge!'
        });
        clearTimeout(timer);
      }
    }, 60000); // 1 minute
  } else {
    const message = affirmations[Math.floor(Math.random() * affirmations.length)];
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon128.png',
      title: 'Angry Grandma',
      message: message
    });
  }
});
