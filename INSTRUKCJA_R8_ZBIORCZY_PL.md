# FIXON R8: jedna aktualizacja od R8.01

Paczka jest przeznaczona do repozytorium z wdrożoną R8.01, czyli R6 z nałożoną R8.01. Nie trzeba instalować R7 ani części R8.02–R8.16. Nie nakładaj tych starszych części po tej aktualizacji.

## Wgranie przez GitHub Desktop

1. Rozpakuj ZIP poza repozytorium. Nie dodawaj samego ZIP-a do repozytorium.
2. Zachowaj kopię lub lokalny commit obecnego stanu. Opcjonalny skrypt `SPRAWDZ_PRZED_WGRANIEM.ps1` tylko sprawdza zgodność plików, niczego nie zmienia.
3. Skopiuj **zawartość** folderu `DO_WGRANIA` do głównego folderu repozytorium, zachowując podfoldery i zastępując aktualizowane pliki. Skopiuj również `.github`, całe `assets/r8-shared` oraz `client-files` wraz z jego `.gitattributes`. Ten lokalny plik zabezpiecza katalogi offline przed konwersją końców wierszy przez Git, bez zastępowania reguł całego repozytorium.
4. Obejrzyj zmiany w GitHub Desktop. Commit i push wykonujesz samodzielnie. W ramach przygotowania tej paczki niczego nie publikowano ani nie wypychano.
5. W ustawieniach repozytorium `Pages → Source` powinno być wybrane **GitHub Actions**. Dołączony workflow przygotowuje i sprawdza rozmiar strony przed publikacją. Nie pomijaj tej zmiany i nie wracaj do publikowania całego katalogu głównego bez kontroli rozmiaru.
6. Po zakończeniu Actions odśwież stronę z pominięciem pamięci podręcznej. Sprawdź `release.json`: oczekiwana wersja to `FIXON_R8_CUMULATIVE_2026-10-24`. Gotowy ZIP nie jest dowodem opublikowania strony.

Nie kopiuj do repozytorium instrukcji, raportów ani całego folderu rozpakowanej paczki. Do repozytorium trafia tylko zawartość `DO_WGRANIA`.

Dodatkowe skrypty są opcjonalne i zostały przetestowane w PowerShell 7. W tym środowisku test PowerShell 5.1 nie mógł użyć `Get-FileHash`, więc zgodność tej wersji pozostaje niezweryfikowana. Samo wgranie plików przez GitHub Desktop nie wymaga uruchamiania skryptów.

## Zawartość

- 49 rynków oraz osobna pozycja WARSAW HOME, cenniki, katalogi internetowe i samodzielne HTML, strony wejściowe, oferty handlowe i materiały partnerskie.
- Progi wartościowe oraz osobne zasady dla maszyn i URBANROOT; poprawki dokładności cen zakupu z R7 są już uwzględnione.
- Program partnerski i osiem stron wzorów dokumentów PL/EN, w tym osobna umowa wyłącznej dystrybucji.
- Cztery PDF w `downloads/fairs`: STANDARD PL/EN oraz WARSAW HOME PL/EN. Katalogi mają 12 produktów na stronie produktowej, GRIX na okładce. W ostatniej korekcie zmieniono tylko typografię okładek WARSAW HOME; strony 2–7 i standardowe PDF zachowano.
- Dwanaście samodzielnych SVG do reklamy i stoiska, sześć PNG oraz pomysły kampanii w `marketing/r8-ads`. SVG zawierają zdjęcia, logo i fonty; gotowe pliki do druku znajdziesz także bezpośrednio w rozpakowanym `DO_WGRANIA/marketing/r8-ads`.

## Rozmiar strony i katalogi offline

Zdjęć produktów nie zmniejszano, nie kadrowano ponownie i nie generowano nowych. Powtarzające się zasoby stron internetowych są przechowywane wspólnie. Katalogi w `client-files` odtwarzają bezstratnie zatwierdzoną zawartość po otwarciu; są samodzielne i nie potrzebują internetu do działania kalkulatora. Otwieraj je w aktualnej przeglądarce Edge lub Chrome. Nie przepisuj ich ani nie zapisuj ponownie w edytorze tekstowym.

Workflow pozostawia w repozytorium, ale nie publikuje w Pages dwóch historycznych instalatorów R4 oraz nowych drukarskich plików SVG. W internetowym spisie reklam odsyłacze SVG prowadzą do tych samych plików w konkretnym commicie repozytorium GitHub. PNG, katalogi, cenniki i cztery PDF nadal są publikowane w Pages. Katalogi ani istniejące adresy stron nie są przenoszone na inny hosting.

Przygotowany lokalnie artefakt mieści się poniżej 1 000 000 000 bajtów. Rzeczywisty rozmiar i sumy kontrolne są w raporcie paczki. Workflow przerwie publikację po przekroczeniu tego progu, również gdy w repozytorium będą dodatkowe pliki. Nie kasuje automatycznie nieznanych plików użytkownika. Kontrola rozmiaru nie jest gwarancją zgodności zastosowania z regulaminem GitHub Pages; ograniczenia wykorzystania komercyjnego wymagają oceny właściciela repozytorium.

## Kontrola po publikacji

- Wybór rynku zawiera 49 krajów i WARSAW HOME; działają PL/EN i właściwe wersje lokalne.
- Menu cennika zmienia poziom współpracy, a maszyny i URBANROOT mają własne rabaty. Koszyk pokazuje rzeczywiste marże, również ujemne lub wymagające wyceny kosztów.
- Oferta targowa jest oznaczona „od 25%”, maszyny 15%, URBANROOT od 30%; bez wymyślonej daty targów.
- Działają zdjęcia, fonty, cztery PDF i odsyłacze referencyjne. Podgląd wiadomości zamówienia nie wysyła jej automatycznie.

Ceny produktów pochodzą z jawnego źródła z 19 października; źródła dostawy i ich zakres opisano w kontroli finansowej. To nie jest nowe odświeżenie sklepu z dnia publikacji. Wzory umów wymagają uzupełnienia danych i lokalnej oceny prawnej przed podpisaniem; nie deklarujemy ich ważności we wszystkich 49 krajach. Audyt wysyłki wymaga osobnego potwierdzenia rzeczywistej publikacji.

Źródła ograniczeń i konfiguracji: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits oraz https://github.com/actions/upload-pages-artifact .
