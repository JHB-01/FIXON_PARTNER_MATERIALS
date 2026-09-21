# FIXON: aktualizacja przez GitHub Desktop

Ta nakładka aktualizuje paczkę GitHub Pages z 19 września 2026 r. Zawiera tylko nowe i zmienione pliki. Nie wymaga usuwania istniejących plików.

## Wgranie aktualizacji

1. Rozpakuj `FIXON_UPDATE_2026-09-20.zip` do osobnego folderu.
2. W GitHub Desktop wybierz repozytorium strony FIXON. Przed aktualizacją zapisz swoje wcześniejsze zmiany w osobnym commicie.
3. Wybierz **Repository → Show in Explorer**, aby otworzyć folder tego repozytorium.
4. Skopiuj do niego **całą zawartość rozpakowanej paczki**, razem z folderami `assets`, `markets` i `prices`. Wklejaj do głównego folderu repozytorium, nie do dodatkowego podfolderu. Potwierdź zastąpienie plików o tych samych nazwach. Nie kopiuj samego ZIP-a.
5. W GitHub Desktop przejrzyj listę zmian. W polu **Summary** wpisz np. `Aktualizacja materiałów partnerskich FIXON` i kliknij **Commit** dla bieżącej gałęzi.
6. Kliknij **Push origin**.
7. Na GitHub otwórz **Actions** i poczekaj na zielony status publikacji. Jeżeli publikacja nie ruszy automatycznie, uruchom workflow wdrożenia przyciskiem **Run workflow**. Ustawienie **Settings → Pages → Source** powinno wskazywać **GitHub Actions**.
8. Otwórz publiczną stronę i odśwież ją z pominięciem pamięci podręcznej (`Ctrl+F5`). Sprawdź wybrany kraj, zmianę języka, zdjęcia, cennik oraz przyciski telefonu i WhatsApp.

## Ważne

- Publikuj całą nakładkę. Grafiki są teraz współdzielone w `assets`, aby paczka była mniejsza. Pojedynczy plik HTML wyjęty z tej paczki nie jest samodzielnym załącznikiem.
- Nie dodawaj do repozytorium archiwum ZIP, folderów roboczych ani wcześniejszych pełnych paczek.
- Aktualizacja obejmuje 49 rynków i 67 lokalnych wariantów materiałów; cenniki i przykładowe katalogi obejmują 68 produktów.
- Plik `UPDATE_OVERLAY_MANIFEST.json` zawiera listę zmian i sumy kontrolne. Nie trzeba go ręcznie edytować.
- Materiały nie zostały opublikowane przez asystenta. Publikacja nastąpi po wykonaniu powyższych kroków.
