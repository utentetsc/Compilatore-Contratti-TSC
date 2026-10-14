const StorageService = (() => {
  const KEY = "contractAppSetupV1";
  const defaults = {
    cinemas: [
      {id:"cin-1",name:"Cinema di esempio",address:"Via Roma 1",city:"Roma"}
    ],
    workTypes: [
      {id:"work-1",name:"Manutenzione tecnica",description:"Attività di manutenzione tecnica programmata"}
    ]
  };
  const clone = x => JSON.parse(JSON.stringify(x));
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || clone(defaults); } catch { return clone(defaults); } }
  function save(data){ localStorage.setItem(KEY, JSON.stringify(data)); }
  function reset(){ save(clone(defaults)); return load(); }
  return {load,save,reset,defaults};
})();