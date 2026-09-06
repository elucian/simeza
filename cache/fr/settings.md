---
title: Paramètres - Simeza Art
description: Personnalisez votre expérience sur la galerie d'art Simeza.
keywords: simeza, paramètres, configuration
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Paramètres

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Délai de boucle (secondes)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Rotation automatique</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> Activé</label>
          <label><input type="radio" name="autoRotation" value="false"> Désactivé</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Barre visible</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Oui</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Non</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Appliquer</button>
    <button type="button" id="cancelSettingsBtn">Annuler</button>
  </div>
</div>