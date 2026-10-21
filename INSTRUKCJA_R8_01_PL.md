# FIXON R8.01: Polska I WARSAW HOME

Pierwsza szybka paczka, bezpośrednio na wdrożoną wersję R6. Nie trzeba wcześniej instalować R7. Paczka zawiera potrzebne poprawki dokładności cen zakupu i marż z R7 oraz nowe zasady R8 dla wskazanych stron.

## Wgranie Przez GitHub Desktop

1. Rozpakuj ZIP.
2. W GitHub Desktop otwórz właściwe repozytorium i jego folder na dysku.
3. Skopiuj zawartość ZIP do głównego folderu repozytorium, zachowując foldery `markets`, `prices`, `updates` i `licenses`. Zastąp pliki o tych samych nazwach. Niczego nie trzeba usuwać.
4. Sprawdź zmiany, zrób commit, a następnie wyślij zmiany na GitHub swoim dotychczasowym sposobem. Paczka nie zmienia konfiguracji wdrożenia.
5. Po zakończeniu wdrożenia otwórz cennik Polski i WARSAW HOME oraz e-katalogi obu rynków. Odśwież stronę bez użycia pamięci podręcznej.

## Co Jest Gotowe

- `prices/FIXON prices Poland.html`: PL/EN, stały wybór poziomu wartości, osobne maszyny i URBANROOT, dokładne ceny zakupu w PLN, aktualizacja cen i marż po zmianie warunków.
- `prices/FIXON prices WARSAW HOME.html`: PL/EN, oferta targowa domyślnie; narzędzia od 25%, maszyny 15%, URBANROOT od 30%.
- `markets/PL/client-qualification-catalog.html` i `markets/WH/client-qualification-catalog.html`: nowe rabaty koszyka według wartości, rabaty każdej kategorii, marże koszyka i podgląd wiadomości zamówienia. Wiadomości nie były wysyłane podczas testów.
- `updates/FIXON-program-R8.html`: nowe zasady w prostym PL/EN, tabele, warunki testu, zwrotu i ogólny opis dystrybucji wyłącznej.

Cenniki mają zdjęcia i fonty wbudowane. Zastosowano źródła produktów i cen z 19 października 2026, bez niezamówionego odświeżania asortymentu.

## Ważne Przy Wycenie

Menu cennika jest podglądem, nie dowodem uzyskania rabatu. Jednorazowy zakup albo opłacone zakupy z ostatnich 30 dni kwalifikują do poziomu utrzymywanego przez 12 miesięcy. Liczba maszyn do ich osobnego rabatu dotyczy łącznej liczby tych maszyn w bieżącym zamówieniu.

Cennik pokazuje szacunek dostawy jednej sztuki z rezerwą i marżę dla takiej wysyłki. Rzeczywisty koszyk w e-katalogu ponownie liczy wspólne pakowanie oraz koszt całego zamówienia. Nieznana dostawa lub import oznacza wycenę, nie zerowy koszt. Marża może być ujemna i nie jest ukrywana.

Koszyk automatycznie kwalifikuje wartość bieżącego zamówienia. Historię opłaconych zakupów, utrzymany poziom i podpisane zobowiązania należy potwierdzić w obsłudze handlowej. Nie powstał system weryfikacji płatności ani automatycznego nadawania praw z umów.

## Zakres Pierwszej Paczki

To gotowa część wdrożenia, nie zamknięcie całego R8. Pozostałe kraje, samodzielne pliki katalogów do wysyłki, dotychczasowe landing pages, Commercial Offer, Marketing Pack, pełne umowy i PDF-y będą aktualizowane w kolejnych paczkach. Te pliki nie są w tej paczce zastępowane. Nowy opis programu nie jest podpisaną umową ani potwierdzeniem prawnej poprawności dystrybucji w każdym kraju.

Do czasu następnych paczek dla PL/WARSAW HOME kieruj odbiorcę do zaktualizowanych cenników, e-katalogów i nowej strony programu; nie przedstawiaj starszych opisów rabatów jako nowych zasad.

## Kontrola

Sprawdzono 73 produkty w obu językach cenników, rabaty i progi kategorii, 36 kontroli silnika koszyka, widoki komputer/telefon, wbudowane obrazy cenników i podgląd wiadomości bez wysyłania. Pakowanie i wycena transportu zostały zachowane z R7/R4, w tym paleta 650 kg netto i 180 cm produktów nad paletą. Szczegóły plików oraz sumy kontrolne zawiera manifest.
