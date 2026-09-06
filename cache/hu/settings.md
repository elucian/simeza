---
title: Beállítások - Simeza Art
description: Szabja testre élményét a Simeza művészeti galériában.
keywords: simeza, beállítások, konfiguráció
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Beállítások

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Hurok késleltetése (másodperc)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Automatikus forgatás</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> Be</label>
          <label><input type="radio" name="autoRotation" value="false"> Ki</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Sáv látható</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Igen</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Nem</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Alkalmaz</button>
    <button type="button" id="cancelSettingsBtn">Mégse</button>
  </div>
</div>