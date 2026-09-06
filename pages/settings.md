---
title: Settings - Simeza Art
description: Customize your experience on Simeza Art gallery.
keywords: simeza, settings, configuration
---

# Settings

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Close">&times;</button>
    <h3 class="filter-modal-title">Settings</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Loop Delay (seconds)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Auto Rotation</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> On</label>
            <label><input type="radio" name="autoRotation" value="false"> Off</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Desktop Layout</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Desktop Layout">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Panels</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Slider</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Music</label>
          <div class="radio-group" role="radiogroup" aria-label="Music">
            <label><input type="radio" name="musicEnabled" value="true"> On</label>
            <label><input type="radio" name="musicEnabled" value="false"> Off</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Shareable Link</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Copy</button>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Cancel</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Apply</button>
    </div>
  </div>
</div>

