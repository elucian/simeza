---
title: Settings - Simeza Art
description: Customize your experience on Simeza Art gallery.
keywords: simeza, settings, configuration
---

# Settings

<div class="settings-dialog">
  <div class="settings-left">
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
        <label>Pillbar Visible</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Yes</label>
          <label><input type="radio" name="pillbarVisible" value="false"> No</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Apply</button>
    <button type="button" id="cancelSettingsBtn">Cancel</button>
  </div>
</div>
