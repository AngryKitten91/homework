'use strict';

const store = {
  // funkcja wywoływana na zdarzenie kliknięcia [V zatwierdź] 
  // w sekcji 'nowy produkt'
  addNewItem: function (item) {
    const todos = this.getData('todos');
    let todosReduce = todos.reduce((agg, curr) => {
      agg.push(curr.name)
      return agg;
    }, []);

    if (item.name !== '' && item.category !== '' && item.shops.length > 0) {
      if (todosReduce.some(x => x === item.name)) {
        todos.filter(x => x.name === item.name).forEach((x) => {
          x.checked = true;
          x.category = item.category;
          x.shops = item.shops;
        });
        item.checked = false;
        todos.push(item);
      } else {
        item.checked = false;
        todos.push(item);
      }
    }


    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia checkboxa [ ] lub [X] 
  // na elemencie listy 'do kupienia' i 'kupione'
  updateItem: function (item) {
    const todos = this.getData('todos');

    const foundItem = todos.find(x => x.name === item.name);
    foundItem.checked = item.checked;

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia usuń [X] 
  // na elemencie listy 'do kupienia' i 'kupione'
  deleteItem: function (item) {
    // znajdź element item w tablicy todos i go usuń z tablicy
    // item ma strukturę: {checked: boolean, name: string, 
    // category: string, shops: [string]}
    const todos = this.getData('todos');

    // za pomocą funkcji find znajdz element spełniający warunek
    // item.name === x.name
    // przypisz ten element do zmiennej
    const found = todos.find(x => x.name === item.name);
    const indexOfItem = todos.indexOf(found);
    // za pomocą funkcji splice usuń element z tablicy todos
    todos.splice(indexOfItem, 1);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku 
  // [zaznacz wszystkie] w sekcji 'multiakcje'
  checkAll: function () {
    // zmień właściwość checked wszystkich obiektów tablicy 
    // todos na true
    const todos = this.getData('todos');

    // for(let i = 0; i < todos.length; i++ ){
    //   todos[i].checked = true;
    // }
    todos.forEach(x => x.checked = true);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [odznacz wszystkie]
  // w sekcji 'multiakcje'
  uncheckAll: function () {
    // zmień właściwość checked wszystkich obiektów tablicy todos na false
    const todos = this.getData('todos');

    // implementacja
    todos.forEach(x => x.checked = false);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [zamień zaznaczenie]
  // w sekcji 'multiakcje'
  switchSelection: function () {
    // przełącz właściwość checked wszystkich obiektów tablicy todos
    // true zamień na false, a false na true
    const todos = this.getData('todos');
    //todos.forEach(x => x.checked ? false : true);
    todos.forEach(x => x.checked = !x.checked);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [usuń wszystkie]
  // w sekcji 'multiakcje'
  deleteAll: function () {
    // usuń wszystkie elementy tablicy todos
    let todos = this.getData('todos');

    todos = [];
    // todos.length = 0;
    // todos.splice(0, todos.length);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [usuń kupione]
  // w sekcji 'multiakcje'
  deleteBought: function () {
    // usuń elementy tablicy todos, które spełniają warunek checked === true
    let todos = this.getData('todos');

    todos = todos.filter(x => !x.checked);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia [V zatwierdź] 
  // w sekcji 'filtry'
  filterItems: function (filter) {
    // przefiltruj tablicę todos względem obiektu wejściowego filter
    // obiekt filter ma strukturę: { name: string, category: string, shops: [string] }
    // żeby sprawdzić czy waunek dla shops jest prawdziwy sprawdź, czy jakikolwiek
    // przesłany element znajduje się w obiekcie tabeli todos (funkcja some) 
    let todos = this.getData('todos');
    // 'cola'.indexOf('co') === 0;
    // 'cola'.indexOf('la') === 2;
    // 'cola'.indexOf('lk') === -1;
    todos = todos
      .filter(x => x.name.indexOf(filter.name) !== -1 || x.name === filter.name)
      .filter(x => x.category.indexOf(filter.category) !== -1 || x.category === filter.category) // category
      .filter((x) => {
        if (filter.shops.length > 0) {
          return filter.shops.some(y => y === x.shops[0]);
        } else {
          return x;
        }
      }) // shops; shops jest tablicą; zastosuj warunek lub ||

    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [sortuj po nazwie],
  // [sortuj po kategorii] i [sortuj po sklepach] w sekcji 'multiakcje'
  sort: function (prop) {
    // posortuj tablicę todos względem parametru przekazanego w atrybucie prop
    // props == 'name' || 'category' || 'shops'
    // obj.name === obj['name']
    const todos = this.getData('todos');
    // console.log(prop);

    // console.log(todos);
    // todos.forEach(x => console.log(x[prop]));
    if (prop === 'shops') {
      todos.sort((a, b) => {
        return a[prop][0].localeCompare(b[prop][0]);
      });
    } else {
      todos.sort((a, b) => {
        return a[prop].localeCompare(b[prop]);
      });
    }

    // implementacja

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja jest wywoływana podczas renderowania aplikacji (po każdej zmianie na liście)
  // funkcja zwraca listę obiektów o strukturze: { name: string, count: number }, gdzie
  // name to nazwa kategorii, a count to liczba produktów z listy do kupienia w tej kategorii
  getCategoriesSummary: function () {

    let todos = this.getData('todos');
    let reduceTodos = todos
      .filter((x) => x.category !== '')
      .sort((a, b) => {
        return a['category'].localeCompare(b.category);
      })
      .reduce((agg, curr) => {
        if (agg[curr.category] >= 1) {
          agg[curr.category] += 1;
        } else {
          agg[curr.category] = 1;
        }
        return agg;
      }, {});

    let objEntries = Object.entries(reduceTodos).map((x) => {
      return {
        name: x[0],
        count: x[1]
      }
    }).sort((a, b) => a.count < b.count);;
    return objEntries;
    // return this.getData('todos');
    // optumalnie należy najpierw należy przefiltrować tablicę, następnie ją zredukować do obiektu
    // potem wykorzystać funkcję przetwarzania obiektów by zmapować entries, a następnie posortować listę
  },

  // funkcja jest wywoływana podczas renderowania aplikacji (po każdej zmianie na liście)
  // funkcja zwraca listę obiektów o strukturze: { name: string, count: number }, gdzie
  // name to nazwa sklepu, a count to liczba produktów z listy do kupienia w tym sklepie
  getShopsSummary: function () {

    let todos = this.getData('todos');
    let reduceTodos = todos
      .filter((x) => x.shops[0] !== '')
      .sort((a, b) => {
        return a.shops[0].localeCompare(b.shops[0]);
      })
      .reduce((agg, curr) => {
        if (curr.shops.length > 1) {
          curr.shops.forEach((x) => {
            if (agg[x]) {
              agg[x] += 1;
            } else {
              agg[x] = 1;
            }
          });
        } else {
          if (agg[curr.shops[0]]) {
            agg[curr.shops[0]] += 1;
          } else {
            agg[curr.shops[0]] = 1;
          }
        }
        return agg;
      }, {});

    let objEntries = Object.entries(reduceTodos).map((x) => {
      return {
        name: x[0],
        count: x[1]
      }
    }).sort((a, b) => a.count < b.count);
    return objEntries;


    // return this.getData('todos')
    // optumalnie należy najpierw należy przefiltrować tablicę, następnie ją zredukować do obiektu
    // potem wykorzystać funkcję przetwarzania obiektów by zmapować entries, a następnie posortować listę
  },

  // funkcja jest wywoływana na kliknięcie w konkretny sklep 
  // na podsumowaniu listy zakupów (między sekcją 'do kupienia' i 'kupione')
  // do funkcji jest przekazywana nazwa aklepu, który został kliknięty
  // zwróć listę stringów (nazw produktów), które są do kupienia w danym slepie
  // listę posortuj alfabetycznie
  getItemNamesContainingShop: function (shop) {
    let todos = this.getData('todos');
    let newFilter = todos.filter((x) => {
      return x.shops[0] === shop;
    }).map((x) => {
      return x.name;
    });

    console.log(newFilter);

    return newFilter;
    // filter
    // map
  },
  // funkcja pobierająca dane o podanym kluczu
  // dostępne klucze: 'todos', 'categories', shops'
  getData: function (key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
  },

  // funkcja aktualizująca dane o podanym kluczu i wartości
  // dostępne klucze: 'todos', 'categories', shops'
  // przyjmowane wartości: tablice danych:
  // categories: tablica stringów
  // shops: tablica stringów
  // todos: tablica obiektów o strukturze: 
  // {
  //   checked: boolean,
  //   name: string,
  //   category: string z dostępnych w tablicy categories
  //   shops: tablica stringów z dostępnych w tablicy shops
  // }
  setData: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}