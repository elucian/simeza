---
title: Настройки - Simeza Art
description: Настройте свой опыт работы с художественной галереей Simeza.
keywords: simeza, настройки, конфигурация
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
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
          <label>Автоматический поворот</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Вкл</label>
            <label><input type="radio" name="autoRotation" value="false"> Выкл</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Макет рабочего стола</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Макет рабочего стола">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Панели</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Слайдер</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Музыка</label>
          <div class="radio-group" role="radiogroup" aria-label="Музыка">
            <label><input type="radio" name="musicEnabled" value="true"> Вкл</label>
            <label><input type="radio" name="musicEnabled" value="false"> Выкл</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Ссылка для обмена</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Копировать</button>
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