---
title: Настройки - Simeza Art
description: Настройте свой опыт в художественной галерее Simeza.
keywords: simeza, настройки, конфигурация
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
---
# Настройки

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Закрыть">&times;</button>
    <h3 class="filter-modal-title">Настройки</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Задержка цикла (секунды)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Автоповорот</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Вкл</label>
            <label><input type="radio" name="autoRotation" value="false"> Выкл</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Видимость панели</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Да</label>
            <label><input type="radio" name="pillbarVisible" value="false"> Нет</label>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Отмена</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Применить</button>
    </div>
  </div>
</div>