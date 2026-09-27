// SARTHI — Indian Standards Assistant (Background Service Worker)
// Official browser companion to MargDarshak Platform

chrome.runtime.onInstalled.addListener(() => {
  if (chrome.contextMenus) {
    chrome.contextMenus.removeAll(() => {
      // Parent Context Menu Item
      chrome.contextMenus.create({
        id: "sarthi-root",
        title: "Sarthi",
        contexts: ["selection"]
      });

      chrome.contextMenus.create({
        id: "sarthi-analyze",
        parentId: "sarthi-root",
        title: "Analyze with Sarthi",
        contexts: ["selection"]
      });

      chrome.contextMenus.create({
        id: "sarthi-find",
        parentId: "sarthi-root",
        title: "Find Indian Standards",
        contexts: ["selection"]
      });

      chrome.contextMenus.create({
        id: "sarthi-add-tender",
        parentId: "sarthi-root",
        title: "Add to Tender",
        contexts: ["selection"]
      });
    });
  }

  console.log("SARTHI — Indian Standards Assistant installed successfully.");
});

// Handle Context Menu Actions
if (chrome.contextMenus && chrome.contextMenus.onClicked) {
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.selectionText && tab?.id) {
      const selectedText = info.selectionText.trim();

      // Store in local storage for popup
      await chrome.storage.local.set({
        selectedRequirement: selectedText,
        contextAction: info.menuItemId,
        timestamp: Date.now()
      });

      // Notify tab content script
      chrome.tabs.sendMessage(tab.id, {
        action: "CONTEXT_MENU_TRIGGER",
        menuItemId: info.menuItemId,
        text: selectedText
      }).catch(() => {});
    }
  });
}

// Handle Messages from Content Script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SAVE_SELECTED_TEXT" && request.text) {
    chrome.storage.local.set({
      selectedRequirement: request.text.trim(),
      timestamp: Date.now()
    }, () => {
      sendResponse({ status: "saved" });
    });
    return true;
  }
});
