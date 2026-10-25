# Kontrola finansowa FIXON R8

## Podstawa cen

Podstawą zakupu jest rzeczywista cena netto produktu w PLN z zatwierdzonego źródła sklepu, przed rabatem. Rabat stosujemy do tej dokładnej wartości. Nie zaokrąglamy zakupu do pełnych złotych, dziesiątek PLN ani pośrednio do pełnych EUR. Dwa miejsca dziesiętne w wyświetlanej cenie nie zmieniają podstawy obliczeń.

Źródło cen produktów: 19 października 2026. Weryfikacja kalkulatora i źródeł dostawy: 21 października 2026; obejmowała m.in. 1872 wyceny jednostkowe UE. Historyczne taryfy dostaw zbiorczych pozostają jawnie oznaczone jako historyczne lub szacunkowe. Nie przypisujemy im automatycznie daty aktualnej publikacji ani nie traktujemy VAT 0% lub braku wyceny eksportowej jako darmowej dostawy.

## Cena sprzedaży i marża

`P` oznacza dokładną cenę netto produktu ze sklepu, a `D1` koszt dostawy jednostkowej wraz z wymaganymi kosztami dla danego kraju.

- Cena detaliczna w punkcie sprzedaży netto: `min((0,90 × P + D1) / 0,80, porównywalna cena sklepu z dostawą netto)`.
- Cena dropshipping netto: `(P + D1) / 0,80`; nie odejmujemy małego detalicznego rabatu 10%.
- Właściwy VAT doliczany jest następnie, według założeń danego rynku i modelu.
- Marża: `(widoczna sprzedaż netto − dokładny zakup netto − rzeczywiste koszty dostawy/importu netto) / widoczna sprzedaż netto`.

Dzielenie przez 0,80 daje 20% marży od danej podstawy, czyli 25% narzutu. Nie oznacza dzielenia przez 0,80%. Ograniczenie RCD ceną sklepu może obniżyć tę marżę. Rabat i marża są różnymi wielkościami: wynik po kosztach nie jest sztucznie podnoszony do wysokości rabatu. Wynik ujemny pozostaje widoczny; nieznany wymagany koszt oznacza nieznaną marżę, a nie zero kosztów.

Polska orientacyjna cena detaliczna jest prezentowana w krokach 10 PLN, z zachowaniem ograniczenia RCD; cena zakupu zachowuje grosze. Marże wynikają z faktycznie pokazywanej ceny netto po tych zasadach prezentacji. Polityka ceny B2B, odpowiadająca 80% widocznej RCD netto, nie jest zmieniana przypadkowym zaokrągleniem zakupu.

Promocje dostawy sklepu: 50% od 500 EUR i darmowa dostawa od 1000 EUR są uwzględniane wyłącznie w porównawczej cenie detalicznej sklepu. Nie obniżają automatycznie kosztu transportu partnera.

Koszty zbiorcze wynikają z rzeczywistego sposobu pakowania i dostępnych taryf, a nie z wymuszonej malejącej stawki lub obietnicy zysku. Dla palety zachowano 120 × 80 × 180 cm samych produktów nad paletą i 650 kg netto towaru. Paczki: maksymalnie 29 kg i 120 × 70 × 20 cm, z konsolidacją, gdy jest możliwa. Produkt z przypisaną dostawą paletową nie jest liczony jako zwykła paczka.

## Rabaty

Wartość kwalifikująca to towary netto przed rabatem, bez VAT i dostawy. Progi standardowe: 1000 EUR → 10%, 5000 EUR → 20%, 25 000 EUR → 30%, 100 000 EUR → 35%. Liczy się jeden zakup albo opłacone zakupy z ostatnich 30 dni. Rabat obejmuje zamówienie przekraczające próg i kolejne przez 12 miesięcy, bez przeliczeń wstecz. Poniżej 1000 EUR obowiązują rzeczywiste warunki konsumenckie sklepu.

Maszyny z osobnej kategorii mają rabat zależny od łącznej liczby tych maszyn w bieżącym zamówieniu:

| Poziom wartości | Liczba maszyn | Rabat |
| --- | --- | ---: |
| Poniżej 25 000 EUR | 1 / co najmniej 2 | 5% / 10% |
| Od 25 000 do poniżej 100 000 EUR | do 5 / ponad 5 | 10% / 15% |
| Od 100 000 EUR | do 20 / ponad 20 | 15% / 20% |

URBANROOT: odpowiedni rabat standardowy zwiększony o 5 punktów procentowych, czyli 15/25/35/40%, nie pomnożony przez 1,05. Kategorie nie są przypisywane na podstawie samej wzmianki o silniku Loncin.

Test standardowy: 20%, maszyny 10%, URBANROOT 25%. Targi: od 25%, maszyny 15%, URBANROOT od 30%, bez zobowiązania wolumenowego, w związku z targami i przez dwa tygodnie od dnia targowego. Rabatów nie dodajemy do siebie. Maksymalne marże promocyjne są warunkowe: standard 35%, maszyny 20% przy odpowiedniej liczbie maszyn, URBANROOT 40%. Nie utożsamiamy tych stawek rabatu z procentem marży.

## Zakres dowodów

Kontrola końcowa sprawdza wersje krajowe i językowe, zgodność danych i wyniku kalkulatora z zatwierdzonym R8, załadowanie zdjęć/fontów, wybór poziomów, podgląd koszyka oraz działanie internetowe i offline. Sumy kontrolne wiążą ostateczne pliki z dowodami, a katalogi offline przed uruchomieniem sprawdzają dokładną zgodność odtworzonego dokumentu.

Nie jest to niezależne ponowne ustalenie wszystkich podatków i aktualnych taryf ze sklepu na dzień publikacji. Dane nie zostały podmienione przy kompresji. Nie wykonywano zamówień, nie wysyłano WhatsApp ani maili, nie publikowano strony. Szczegóły pokrycia krajów i języków są w CSV oraz raporcie JSON paczki. Pola kosztów wymagające odrębnej wyceny nadal wymagają potwierdzenia przed zamówieniem.
