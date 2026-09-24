# FIXON R3: czcionki i link referencyjny

Mała nakładka na zainstalowane wydanie R2. Nie jest samodzielną stroną. Nie zmienia plików HTML, adresów stron, SKU, cen ani struktury pod Apps Script.

## Wdrożenie przez GitHub Desktop

1. Otwórz właściwe repozytorium. Wybierz `Repository > Show in Explorer`.
2. Rozpakuj ZIP i skopiuj jego zawartość do głównego folderu repozytorium. Scal folder `assets` i zastąp dwa istniejące pliki `assets/ui-r2.css` oraz `assets/ui-r2.js`. Nie twórz dodatkowego folderu nadrzędnego.
3. W GitHub Desktop sprawdź zmiany. Wykonaj commit `FIXON R3: fonts and referral links`, a następnie `Push origin`.
4. Poczekaj na zielony wynik najnowszego uruchomienia `Deploy FIXON Partner Materials` w zakładce `Actions`.
5. Otwórz publiczny adres strony, odśwież przez `Ctrl+F5` i sprawdź również okno incognito.

Nie trzeba usuwać starych plików czcionki: nowe style już ich nie wykorzystują. Dwa stare pliki logo opisane w instrukcji R2 nadal można usunąć osobnym commitem; ich obecność nie blokuje tej aktualizacji.

## Czcionki

- Inter: zwykły tekst.
- Oswald: nagłówki.
- Roboto Condensed: zwarte elementy nawigacji i przyciski.
- Roboto: tabele i dane liczbowe.

Czcionki i ich licencje OFL są dołączone do paczki. Nie wymagają połączenia z Google Fonts. Dla alfabetów nieobsługiwanych przez dany font pozostają odpowiednie fonty zastępcze.

## Referencja: co jest zapisywane

Od otwarcia pierwszej strony, także wyboru kraju i języka, skrypt zapamiętuje lokalnie kod `6oxwxmm663ix`. Dodaje parametr `ref=6oxwxmm663ix` do linków prowadzących na `fixon.pro` i `www.fixon.pro`, również po zmianie języka lub filtrowaniu katalogu. Istniejące parametry i fragmenty adresu pozostają zachowane. Linki do innych serwisów nie są zmieniane.

WAŻNE: zapis w tej paczce nie oznacza jeszcze zarejestrowanej wizyty w sklepie FIXON. Sklep ustawia własne ciasteczko referencyjne po rzeczywistym otwarciu jego strony z parametrem `ref`. GitHub Pages nie może ustawić tego ciasteczka w tle: sklep stosuje `HttpOnly; SameSite=Lax` i blokuje osadzanie strony. Nie dodano ukrytego przekierowania ani mechanizmu pozorującego rejestrację wizyty.

Zgodnie z zatwierdzoną decyzją ekran wyboru kraju pozostaje bez przekierowania. Referencja jest przekazywana przy przejściu do sklepu.

## Szybka kontrola

- W publicznym `assets/ui-r2.css` powinny występować nazwy Inter i Oswald.
- W publicznym `assets/ui-r2.js` powinien występować kod `6oxwxmm663ix`.
- Po załadowaniu katalogu skopiuj adres odnośnika do produktu FIXON: powinien zawierać `ref=6oxwxmm663ix`.
- Brak nowych plików w publicznym adresie oznacza problem z kopiowaniem, pushem, wybraną gałęzią lub wdrożeniem, a nie konieczność przebudowy całej strony.
