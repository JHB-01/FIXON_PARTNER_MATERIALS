# FIXON R2: aktualizacja przez GitHub Desktop

Ta paczka jest nakładką na wydanie z 20 września 2026. Nie jest samodzielną stroną. Nie usuwaj całego repozytorium ani jego folderu `.git`.

## Wgranie aktualizacji
1. W GitHub Desktop otwórz repozytorium FIXON i właściwą gałąź. Użyj `Fetch origin`, a następnie `Pull origin`, jeżeli są zmiany do pobrania.
2. Wybierz `Repository > Show in Explorer`. To właśnie tutaj kopiujesz pliki, nie do folderu archiwum ZIP.
3. Rozpakuj paczkę R2 do osobnego folderu. Skopiuj jej zawartość do głównego folderu repozytorium, scalając foldery i zastępując pliki o tych samych nazwach. Nie dodawaj dodatkowego folderu nadrzędnego R2.
4. Usuń z repozytorium tylko dwa nieużywane pliki dawnego logo wymienione poniżej. ZIP sam nie usuwa starych plików. Starsze makiety publikacji pozostają, ale mają widoczne oznaczenie.
5. Wróć do GitHub Desktop. W `Changes` sprawdź zmienione pliki i dwa usunięcia. Nie dołączaj własnych, niezwiązanych zmian. Wpisz opis `FIXON R2: media, typography and partner materials`, kliknij `Commit to ...`, potem `Push origin`.
6. Na GitHub otwórz `Actions` i poczekaj na zakończenie `Deploy FIXON Partner Materials`. Jeżeli workflow nie uruchomi się po pushu, wybierz go i kliknij `Run workflow`. Nie zmieniaj ustawień publikacji, jeśli strona już działa.
7. Otwórz dotychczasowy adres strony i odśwież ją przez `Ctrl+F5`. Sprawdź stronę na telefonie, tabelę rabatów, katalog po kliknięciu produktu oraz rozwijane materiały wideo.

## Dwa stare pliki do usunięcia
W folderze `assets/fixon-media/` usuń tylko:
- `d9e5baeba9d51c14f89db89de94ff0812b58ba8bf2bb01f02c5fe5572c5b2e12.webp`
- `eb742a07af60585cacb43601e1f4c36adee2add3070bbdfb7bc7f9a974748ea4.webp`

Nie usuwaj pozostałych zdjęć produktów ani nowego logo SVG. Po wykonaniu commitu stare wersje są nadal dostępne w historii Git.

## Zakres i zachowanie
- Adresy stron, identyfikatory sekcji i SKU pozostają bez zmian. Nie trzeba zmieniać linków w skryptach sprzedażowych ani Apps Script.
- Ceny nie są aktualizowane tą nakładką. Rabat pierwszego zamówienia wynosi 20%; kolejne progi opisuje tabela.
- Kadry z filmów są w paczce. Odtwarzacze TikTok oraz linki Facebook wymagają internetu i dostępności zewnętrznego serwisu. Film ładuje się dopiero po rozwinięciu; nie uruchamia się automatycznie.
- Schueler XP Neue obejmuje używaną łacinę, cyrylicę i grekę. Dla gruzińskiego i ormiańskiego pozostaje font systemowy obsługujący ich alfabet. Licencja dostarczona wraz z czcionką znajduje się w `assets/fonts/schueler-xp-neue/`.
- Animacje respektują systemowe ograniczenie ruchu. Materiały ze starym logo zachowane jako przykłady są oznaczone jako starsze makiety, a nie aktualne promocje.

Paczka nie publikuje niczego samodzielnie. Publikacja następuje dopiero po Twoim pushu i pomyślnym zakończeniu workflow.
