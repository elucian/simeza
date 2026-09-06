---
title: Setări - Simeza Art
description: Personalizați-vă experiența pe galeria de artă Simeza.
keywords: simeza, setări, configurare
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Setări

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Întârziere buclă (secunde)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Rotație automată</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> Pornit</label>
          <label><input type="radio" name="autoRotation" value="false"> Oprit</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Bară vizibilă</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Da</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Nu</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Aplică</button>
    <button type="button" id="cancelSettingsBtn">Anulează</button>
  </div>
</div>