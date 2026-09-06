---
title: Einstellungen - Simeza Art
description: Personalisieren Sie Ihr Erlebnis in der Simeza Kunstgalerie.
keywords: Simeza, Einstellungen, Konfiguration
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Einstellungen

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Schleifenverzögerung (Sekunden)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Automatische Rotation</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> An</label>
          <label><input type="radio" name="autoRotation" value="false"> Aus</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Pillbar sichtbar</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Ja</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Nein</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Anwenden</button>
    <button type="button" id="cancelSettingsBtn">Abbrechen</button>
  </div>
</div>