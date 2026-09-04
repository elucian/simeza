# Release Notes: 0.1.1-rc.12

- **Release Date**: 2026-09-03 21:16:01
- **Current Commit**: `ddcd383e87113551c105929fbf28bada831d45f6`
- **Previous Commit**: `94399292d2f02bf819d1a1198be19ea1da28b3ac`

## Summary of Commits
```text
ddcd383 Build candidate: Thu, Sep  3, 2026  9:11:48 PM
b5e122d Build candidate: Thu, Sep  3, 2026  9:02:32 PM
6c1697e Fix gallery modal form: unify field structure, standardise label/input spacing, and enforce input heights
83ab173 Build candidate: Thu, Sep  3, 2026  7:59:29 PM
31ebf56 Build candidate: Thu, Sep  3, 2026  7:53:43 PM
4be6848 Commit: Thu, Sep  3, 2026  7:53:38 PM
0a46dbd Build candidate: Thu, Sep  3, 2026  7:47:19 PM
fad2eaa Fix CSS regression: Restore footer, typography, and navigation responsive styles
1a35326 Build candidate: Thu, Sep  3, 2026  7:34:52 PM
17f57bd Update .gitignore
ae2946c Publish release: v0.1.1-rc.6
```

## Affected Files
```text
.gitignore
core/css/gallery.css
core/css/style.css
core/js/gallery.js
core/js/simeza.js
local/.nojekyll
local/CNAME
local/content/README.md
local/content/archive/arta.html
local/content/archive/carti.html
local/content/archive/interview.html
local/content/archive/matematica.html
local/content/archive/poezie.html
local/content/archive/scrieri.html
local/content/archive/spiritualitate.html
local/content/authors/author-1.json
local/content/authors/cornilescu.jpg
local/content/authors/ioanid.jpg
local/content/books/ 14 iulie 40.pdf
local/content/books/1 September 40.pdf
local/content/books/11 August 40.pdf
local/content/books/13 Oktober 40.pdf
local/content/books/18 August 40.pdf
"local/content/books/20 Oktober 40-ultima predic\304\203.pdf"
local/content/books/20 Oktober 40.pdf
local/content/books/21 iulie 40.pdf
local/content/books/22 September 40.pdf
local/content/books/25 August 40.pdf
local/content/books/28. Juli 40.pdf
local/content/books/29 September 40.pdf
local/content/books/51e1Ng-iGgL.jpg
local/content/books/6 Oktober 40.pdf
local/content/books/8 September  40 II Text.pdf
local/content/books/8 September 40.pdf
local/content/books/BLM si invazia kitch in muzeele americane.pdf
local/content/books/Costache Ioanid Poezii.pdf
"local/content/books/Decadent\314\246a Artei.pdf"
"local/content/books/Isus-Temelia-Vie\310\233ii.jpg"
local/content/books/Masurile.pdf
local/content/books/Poliedrele.pdf
local/content/books/Spira mirabilis.pdf
local/content/books/album.jpg
local/content/books/alexandru-donici.jpg
local/content/books/amintiri.jpg
"local/content/books/asem\304\203narea.pdf"
"local/content/books/cine-e\310\231ti-tu.jpg"
local/content/books/derivata.pdf
local/content/books/eben ezer-legea inductiei.pdf
local/content/books/garden-of-eden.jpg
local/content/books/geometry-conics.jpg
local/content/books/geometry-history.jpg
local/content/books/gradina-eden.jpg
local/content/books/istoria-logaritmilor.jpg
local/content/books/iustina_popescu.jpg
local/content/books/logaritmi.jpg
local/content/books/logaritmi.pdf
local/content/books/pentagonul.pdf
local/content/books/picturi-muscel.jpg
local/content/books/poezii_ioanid.jpg
"local/content/books/prefa\310\233\304\203.pdf"
local/content/books/reforma-cover.jpg
local/content/books/reforma-muscel.jpg
local/content/books/scrieri-cover.jpg
local/content/books/sub-cruce-cover.jpg
local/content/books/sub-cruce-traduceri.jpg
local/content/books/sub-cruce.jpg
local/content/events/event-1.json
local/content/gallery/aby-7-ani.json
local/content/gallery/aby-7-ani.webp
local/content/gallery/aby-la-ocean.json
local/content/gallery/aby-la-ocean.webp
local/content/gallery/barci-la-soare.json
local/content/gallery/barci-la-soare.webp
local/content/gallery/beach-in-greece.json
local/content/gallery/beach-in-greece.webp
local/content/gallery/biserica-la-rasinari.json
local/content/gallery/biserica-la-rasinari.webp
local/content/gallery/bujori-2.json
local/content/gallery/bujori-2.webp
local/content/gallery/camp-cu-nori.json
local/content/gallery/camp-cu-nori.webp
local/content/gallery/carmel-2.json
local/content/gallery/carmel-2.webp
local/content/gallery/catalina-island-2.json
local/content/gallery/catalina-island-2.webp
local/content/gallery/cer-in-apa.json
local/content/gallery/cer-in-apa.webp
local/content/gallery/crizanteme-cu-mere.json
local/content/gallery/crizanteme-cu-mere.webp
local/content/gallery/curtea-mamei.json
local/content/gallery/curtea-mamei.webp
local/content/gallery/edy-mai-mic.json
local/content/gallery/edy-mai-mic.webp
local/content/gallery/flori-de-camp.json
local/content/gallery/flori-de-camp.webp
local/content/gallery/flori-la-mihai.json
local/content/gallery/flori-la-mihai.webp
local/content/gallery/flori-pe-covor-de-rucar.json
local/content/gallery/flori-pe-covor-de-rucar.webp
local/content/gallery/flori-pe-stergar.json
local/content/gallery/flori-pe-stergar.webp
local/content/gallery/garoafe.json
local/content/gallery/garoafe.webp
local/content/gallery/gradina-cu-rufe.json
local/content/gallery/gradina-cu-rufe.webp
local/content/gallery/gura-leului.json
local/content/gallery/gura-leului.webp
local/content/gallery/la-jolla-cove.json
local/content/gallery/la-jolla-cove.webp
local/content/gallery/lac-pe-grui.json
local/content/gallery/lac-pe-grui.webp
local/content/gallery/lavander-si-mt-hood.json
local/content/gallery/lavander-si-mt-hood.webp
local/content/gallery/luminis-in-parcul-mirea.json
local/content/gallery/luminis-in-parcul-mirea.webp
local/content/gallery/maci.json
local/content/gallery/maci.webp
local/content/gallery/mesteceni-2.json
local/content/gallery/mesteceni-2.webp
local/content/gallery/miki3.json
local/content/gallery/miki3.webp
local/content/gallery/muntele-athos.json
local/content/gallery/muntele-athos.webp
local/content/gallery/pinos.json
local/content/gallery/pinos.webp
local/content/gallery/plaja-insorita.json
local/content/gallery/plaja-insorita.webp
local/content/gallery/san-juan-capistrano-2.json
local/content/gallery/san-juan-capistrano-2.webp
local/content/gallery/schitul-pasarea.json
local/content/gallery/schitul-pasarea.webp
local/content/gallery/self-portrait-4.json
local/content/gallery/self-portrait-4.webp
local/content/gallery/sibiu-centru.json
local/content/gallery/sibiu-centru.webp
local/content/gallery/soare-pe-plaja.json
local/content/gallery/soare-pe-plaja.webp
local/content/gallery/tartacute.json
local/content/gallery/tartacute.webp
local/content/gallery/tufanele-3.json
local/content/gallery/tufanele-3.webp
local/content/gallery/tufanele-cu-mar.json
local/content/gallery/tufanele-cu-mar.webp
local/content/gallery/ventura-3.json
local/content/gallery/ventura-3.webp
local/content/gallery/ventura1.json
local/content/gallery/ventura1.webp
local/content/gallery/vine-toamna.json
local/content/gallery/vine-toamna.webp
local/content/garbage/aby-6-ani.json
local/content/garbage/aby-6-ani.webp
local/content/garbage/aby-cu-fundita.json
local/content/garbage/aby-cu-fundita.webp
local/content/garbage/ana.json
local/content/garbage/ana.webp
local/content/garbage/anemone.json
local/content/garbage/anemone.webp
local/content/garbage/anita.json
local/content/garbage/anita.webp
local/content/garbage/athos-mountain.json
local/content/garbage/athos-mountain.webp
local/content/garbage/beach-pe-101-n.json
local/content/garbage/beach-pe-101-n.webp
local/content/garbage/berny.json
local/content/garbage/berny.webp
local/content/garbage/bianca.json
local/content/garbage/bianca.webp
local/content/garbage/bianca1.json
local/content/garbage/bianca1.webp
local/content/garbage/bibi.json
local/content/garbage/bibi.webp
local/content/garbage/buchet.json
local/content/garbage/buchet.webp
local/content/garbage/bujori.json
local/content/garbage/bujori.webp
local/content/garbage/bunicul.json
local/content/garbage/bunicul.webp
local/content/garbage/capite.json
local/content/garbage/capite.webp
local/content/garbage/carmel-1.json
local/content/garbage/carmel-1.webp
local/content/garbage/casa-parintilor-1.json
local/content/garbage/casa-parintilor-1.webp
local/content/garbage/casa-parintilor-2.json
local/content/garbage/casa-parintilor-2.webp
local/content/garbage/catalina-island.json
local/content/garbage/catalina-island.webp
local/content/garbage/cisnadioara.json
local/content/garbage/cisnadioara.webp
local/content/garbage/crater-lake.json
local/content/garbage/crater-lake.webp
local/content/garbage/crizanteme-cu-squash.json
local/content/garbage/crizanteme-cu-squash.webp
local/content/garbage/crizanteme.json
local/content/garbage/crizanteme.webp
local/content/garbage/delta-1.json
local/content/garbage/delta-1.webp
local/content/garbage/delta-2.json
local/content/garbage/delta-2.webp
local/content/garbage/edy.json
local/content/garbage/edy.webp
local/content/garbage/floarea-soarelui.json
local/content/garbage/floarea-soarelui.webp
local/content/garbage/flori-cu-tartacute.json
local/content/garbage/flori-cu-tartacute.webp
local/content/garbage/flori-cu-umbrela.json
local/content/garbage/flori-cu-umbrela.webp
local/content/garbage/flori-cu-vas.json
local/content/garbage/flori-cu-vas.webp
local/content/garbage/flori-cu-vioara.json
local/content/garbage/flori-cu-vioara.webp
local/content/garbage/flori-de-camp-cu-vas.json
local/content/garbage/flori-de-camp-cu-vas.webp
local/content/garbage/flori-galbene-cu-stergar.json
local/content/garbage/flori-galbene-cu-stergar.webp
local/content/garbage/flori-in-cos.json
local/content/garbage/flori-in-cos.webp
local/content/garbage/flori-pastel.json
local/content/garbage/flori-pastel.webp
local/content/garbage/flori-pe-masa.json
local/content/garbage/flori-pe-masa.webp
local/content/garbage/flori.json
local/content/garbage/flori.webp
local/content/garbage/garoafe-cu-vas-galben.json
local/content/garbage/garoafe-cu-vas-galben.webp
local/content/garbage/georgel.json
local/content/garbage/georgel.webp
local/content/garbage/girl-at-the-beach.json
local/content/garbage/girl-at-the-beach.webp
local/content/garbage/greece-beach.json
local/content/garbage/greece-beach.webp
local/content/garbage/iarna-blanda-in-gradina.json
local/content/garbage/iarna-blanda-in-gradina.webp
local/content/garbage/joshua-trees.json
local/content/garbage/joshua-trees.webp
local/content/garbage/la-fantana.json
local/content/garbage/la-fantana.webp
local/content/garbage/la-tara.json
local/content/garbage/la-tara.webp
local/content/garbage/laguna-beach.json
local/content/garbage/laguna-beach.webp
local/content/garbage/lalele.json
local/content/garbage/lalele.webp
local/content/garbage/liliac.json
local/content/garbage/liliac.webp
local/content/garbage/liniste-pe-lac.json
local/content/garbage/liniste-pe-lac.webp
local/content/garbage/luminis-1.json
local/content/garbage/luminis-1.webp
local/content/garbage/luminis.json
local/content/garbage/luminis.webp
local/content/garbage/mama.json
local/content/garbage/mama.webp
local/content/garbage/marea-neagra.json
local/content/garbage/marea-neagra.webp
local/content/garbage/merisor.json
local/content/garbage/merisor.webp
local/content/garbage/mesteceni-1.json
local/content/garbage/mesteceni-1.webp
local/content/garbage/mesteceni-3.json
local/content/garbage/mesteceni-3.webp
local/content/garbage/michelsberg-cetatea.json
local/content/garbage/michelsberg-cetatea.webp
local/content/garbage/michelsberg.json
local/content/garbage/michelsberg.webp
local/content/garbage/midland-mi.json
local/content/garbage/midland-mi.webp
local/content/garbage/miki-cu-fructe.json
local/content/garbage/miki-cu-fructe.webp
local/content/garbage/miki-mireasa.json
local/content/garbage/miki-mireasa.webp
local/content/garbage/miki-palm-springs.json
local/content/garbage/miki-palm-springs.webp
local/content/garbage/miki-sanguina.json
local/content/garbage/miki-sanguina.webp
local/content/garbage/miki1.json
local/content/garbage/miki1.webp
local/content/garbage/miki2.json
local/content/garbage/miki2.webp
local/content/garbage/mona.json
local/content/garbage/mona.webp
"local/content/garbage/n\304\203m\304\203ie\310\231ti.json"
"local/content/garbage/n\304\203m\304\203ie\310\231ti.webp"
local/content/garbage/pacific-grove.json
local/content/garbage/pacific-grove.webp
local/content/garbage/pe-masa.json
local/content/garbage/pe-masa.webp
local/content/garbage/pe-valea-dambovitei.json
local/content/garbage/pe-valea-dambovitei.webp
local/content/garbage/pe-valuri.json
local/content/garbage/pe-valuri.webp
local/content/garbage/pescarita.json
local/content/garbage/pescarita.webp
local/content/garbage/petrona.json
local/content/garbage/petrona.webp
local/content/garbage/poiana-in-mi.json
local/content/garbage/poiana-in-mi.webp
local/content/garbage/point-loma.json
local/content/garbage/point-loma.webp
local/content/garbage/prima-pictura.json
local/content/garbage/prima-pictura.webp
local/content/garbage/roze-galbene.json
local/content/garbage/roze-galbene.webp
local/content/garbage/roze-pe-fond-inchis.json
local/content/garbage/roze-pe-fond-inchis.webp
local/content/garbage/san-juan-capistrano1.json
local/content/garbage/san-juan-capistrano1.webp
local/content/garbage/satic.json
local/content/garbage/satic.webp
local/content/garbage/self-portrait-1989.json
local/content/garbage/self-portrait-1989.webp
local/content/garbage/self-portrait-2.json
local/content/garbage/self-portrait-2.webp
local/content/garbage/self-portrait-2005.json
local/content/garbage/self-portrait-2005.webp
local/content/garbage/self-portrait-5.json
local/content/garbage/self-portrait-5.webp
local/content/garbage/self-portrait-6.json
local/content/garbage/self-portrait-6.webp
local/content/garbage/simfonie-in-albastru.json
local/content/garbage/simfonie-in-albastru.webp
local/content/garbage/squash-cu-stergar.json
local/content/garbage/squash-cu-stergar.webp
local/content/garbage/stergar-cu-flori-galbene.json
local/content/garbage/stergar-cu-flori-galbene.webp
local/content/garbage/tata.json
local/content/garbage/tata.webp
local/content/garbage/towsley-canyon.json
local/content/garbage/towsley-canyon.webp
local/content/garbage/trandafiri.json
local/content/garbage/trandafiri.webp
local/content/garbage/trump.json
local/content/garbage/trump.webp
local/content/garbage/tufanele.json
local/content/garbage/tufanele.webp
local/content/garbage/vas-alb-cu-garoafe-rosii.json
local/content/garbage/vas-alb-cu-garoafe-rosii.webp
local/content/garbage/ventura-2.json
local/content/garbage/ventura-2.webp
local/content/writings/3 Tate din Satic.pdf
local/content/writings/Adunari de munte si biserici din America.pdf
local/content/writings/Bunicul Lucan.pdf
local/content/writings/Cameron.pdf
"local/content/writings/Din c\304\203lug\304\203r la c\303\242rcium\304\203.pdf"
"local/content/writings/M\303\242na mamei.pdf"
local/content/writings/drumul calvarului.pdf
local/core/css/content-panel.css
local/core/css/gallery.css
local/core/css/slyder.css
local/core/css/style.css
local/core/img/de-flag.svg
local/core/img/en-flag.svg
local/core/img/es-flag.svg
local/core/img/favicon.svg
local/core/img/fr-flag.svg
local/core/img/simeza-logo-b.jpg
local/core/img/simeza-logo-b.svg
local/core/img/simeza-logo-w.jpg
local/core/img/simeza-logo-w.png
local/core/img/simeza-logo-w.svg
local/core/js/content-panel.js
local/core/js/gallery.js
local/core/js/global.js
local/core/js/modules/app.js
local/core/js/modules/theme.js
local/core/js/simeza.js
local/de/autoren.html
local/de/buecher.html
local/de/galerie.html
local/de/index.html
local/de/schriften.html
local/de/ueber-uns.html
local/de/veranstaltungen.html
local/en/about.html
local/en/authors.html
local/en/books.html
local/en/events.html
local/en/gallery.html
local/en/index.html
local/en/writings.html
local/es/autores.html
local/es/escritos.html
local/es/eventos.html
local/es/galeria.html
local/es/index.html
local/es/libros.html
local/es/sobre-nosotros.html
local/fr/a-propos.html
local/fr/auteurs.html
local/fr/ecrits.html
local/fr/evenements.html
local/fr/galerie.html
local/fr/index.html
local/fr/livres.html
local/hu/esemenyek.html
local/hu/galeria.html
local/hu/index.html
local/hu/irasok.html
local/hu/konyvek.html
local/hu/rolunk.html
local/hu/szerzok.html
local/index.html
local/it/autori.html
local/it/chi-siamo.html
local/it/eventi.html
local/it/galleria.html
local/it/index.html
local/it/libri.html
local/it/scritti.html
local/pt/autores.html
local/pt/escritos.html
local/pt/eventos.html
local/pt/galeria.html
local/pt/index.html
local/pt/livros.html
local/pt/sobre.html
local/ro/autori.html
local/ro/carti.html
local/ro/despre.html
local/ro/evenimente.html
local/ro/galerie.html
local/ro/index.html
local/ro/scrieri.html
local/ru/avtory.html
local/ru/galereya.html
local/ru/index.html
local/ru/knigi.html
local/ru/o-nas.html
local/ru/sobytiya.html
local/ru/stati.html
manual/personal-notes.md
release/notes-0.1.1-rc.6.md
release/release.log
release/releases.json
script/build.py
```
