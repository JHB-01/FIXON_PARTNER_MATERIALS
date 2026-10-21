# FIXON R8.03 - ceny, marze i zwarte katalogi PL/EN

## Instalacja przez GitHub Desktop

1. Rozpakuj ZIP do osobnego folderu. Otworz w GitHub Desktop lokalne repozytorium materialow FIXON.
2. Skopiuj ZAWARTOSC rozpakowanego folderu do glownego folderu repozytorium. Zastap pliki o tych samych nazwach. Nie tworz dodatkowego katalogu nadrzednego.
3. Sprawdz liste zmian. Pakiet nie wymaga usuwania plikow. Zawiera poprawki potrzebne bezposrednio na R6; osobne instalowanie R7, R8.01 lub R8.02 nie jest konieczne dla objetych nim stron.
4. Wpisz opis `FIXON R8.03 - ceny i marze, katalogi 12 produktow na strone`, wybierz Commit, a potem Push origin. Te czynnosci wykonujesz samodzielnie; paczka nie publikuje nic automatycznie.
5. Po zakonczeniu istniejacego wdrozenia sprawdz strony PL i WARSAW HOME, oba jezyki oraz cztery PDF. Odswiez przegladarke bez pamieci podrecznej. Adresy i nazwy plikow pozostaja bez zmian.

## Zakres tej szybkiej paczki

- Cenniki Polski i WARSAW HOME, po polsku i angielsku.
- Internetowe katalogi doboru narzedzi PL i WARSAW HOME oraz ich koszyki.
- Cztery PDF: standard PL/EN i WARSAW HOME PL/EN. Kazdy ma 7 stron: okladke z GRIX oraz 6 stron po 12 produktow.
- Podsumowanie programu R8 i licencje fontow sa dolaczone, aby strony dzialaly po nalozeniu na R6.

To NIE jest zakonczenie calego R8. Pozostale 48 rynkow, samodzielne eksporty `client-files`, pelne umowy, dotychczasowe landingi, Commercial Offer, Marketing Pack i grafiki reklamowe pozostaja do dalszej aktualizacji. Nie przedstawiaj ich jako poprawionych przez te paczke.

## Ceny i marze

P to cena netto produktu w fixon.pro. D1 to jednostkowa dostawa netto do modelowego adresu PL 05-077. Obliczenia rozdzielaja VAT 23% od kosztow netto.

- RCD netto = mniejsza z wartosci: `(0,90 x P + D1) / 0,80` i cena netto sklepu z dostawa. To rekomendowana cena detaliczna w punkcie sprzedazy, nie obowiazkowa cena odsprzedazy.
- Dropshipping netto = `(P + D1) / 0,80`. Tu nie ma pomniejszenia P o 10%.
- VAT dodajemy po obliczeniu cen netto. RCD brutto zaokraglamy do 10 PLN W DOL, aby nie przekroczyc limitu ceny sklepu z dostawa. Orientacyjna cene dropshipping zaokraglamy do najblizszych 10 PLN. Marza korzysta z tych widocznych cen po usunieciu VAT.
- Cena zakupu partnera = rzeczywista cena netto PLN pomniejszona o wlasciwy rabat kategorii. Bez zaokraglania do PLN, do 10 PLN ani przez posrednia zaokraglona cene EUR. Grosze sa tylko sposobem prezentacji.
- Marza = `(sprzedaz netto - zakup netto - dostawa netto) / sprzedaz netto`. B2B nadal oznacza 80% rekomendowanej ceny detalicznej netto. Nie laczymy rabatu i marzy w jeden wskaznik.
- RCD i cena dropshipping zawieraja jednostkowa podstawe dostawy: nie doliczaj jej drugi raz klientowi. Koszyk zakupu partnera osobno pokazuje rzeczywista modelowa dostawe calego zamowienia.
- Gdy koszty sa nieznane, pokazujemy wycene zamiast fikcyjnej marzy. Ujemne marze nie sa ukrywane.

Przyklad GRIX: detal 230 PLN brutto, z limitem sklepu z dostawa 230,21 PLN. Przy maksymalnym rabacie 35% zakup netto to dokladnie 111,085 PLN za sztuke, prezentowany jako 111,09 PLN. Model 100 sztuk: dostawa 420 PLN brutto / 341,4634146 PLN netto za cala przesylke; marza detaliczna okolo 38,77%. Przy zakupie jednej sztuki marza jest nizsza: nie narzucamy sztucznego minimum rownego rabatowi.

PDF pokazuje osobno zakup testowy i marze DO przy maksymalnym rabacie kategorii. Marza obok produktu NIE odnosi sie do malej ceny testowej. Scenariusze 10/50/100 sztuk sluza tylko modelowi transportu, nie sa progami rabatu. Progi programu pozostaja wartosciowe.

## Zrodla i ograniczenia dostawy

Ceny netto produktow z 19.10.2026 ponownie porownano ze sklepem 21.10.2026: brak zmian w dostepnych produktach. Baza ma 73 SKU. Biezace wyceny dostawy pobrano z kalkulatora FIXON dla PL 05-077; dostawa jednostkowa jest cena "od", nie gwarancja dla dowolnego adresu. Nie uzywamy tymczasowej kwoty 24,60 PLN z karty przed wybraniem adresu, gdy kalkulator dla konkretnego adresu pokazuje 20 PLN brutto.

Zachowano pakowanie: paczki do 29 kg i 120 x 70 x 20 cm; palety do 650 kg netto i 120 x 80 x 180 cm samych produktow. Stawki paczkowe wynikaja ze zweryfikowanego kalkulatora sklepu. Dla palet model stosuje stawke gabarytowa sklepu 120 PLN brutto OSOBNO na kazda rzeczywiscie wyliczona palete. Jest to szacunek wymagajacy potwierdzenia przewoznika, nie pobrana ze sklepu wiazaca oferta wielopaletowa. Zgodnie z potwierdzeniem wlasciciela promocje dostawy dla zakupow detalicznych NIE obowiazuja przy dostawach do partnera.

W limicie RCD uwzgledniamy rowniez aktualne detaliczne promocje dostawy sklepu: polowe dostawy od 500 EUR i darmowa od 1000 EUR. Zgodnie z wyraznym potwierdzeniem wlasciciela NIE dotycza one dostaw do partnera z rabatami R8. Dlatego koszt zakupu partnera jest liczony wedlug bazowej taryfy i rzeczywistego pakowania, nawet gdy detaliczny zakup porownawczy ma bezplatna dostawe.

Dla 16 produktow nie da sie obecnie obliczyc wiarygodnego modelu transportu ze wszystkich wymaganych danych. Pokazano wtedy brak marzy, a nie zerowy koszt. Karta BRUKFILL w zrodle zwracala 404: produkt zachowano w katalogu, z indywidualna wycena i bez wymyslonej ceny z dostawa.

Zrodla: https://fixon.pro/pl/page/czas-i-sposoby-dostawy?ref=6oxwxmm663ix oraz kalkulator dostawy kart produktow fixon.pro. Podglad koszyka i wiadomosci sprawdzono bez wysylania WhatsApp. Nie uzywano pluginu GitHub ani nie publikowano zmian.
