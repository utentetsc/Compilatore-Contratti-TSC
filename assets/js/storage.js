const StorageService = (() => {
  const KEY = "contractAppSetupV2";
  const LEGACY_KEY = "contractAppSetupV1";
  const DB_KEY = "contractAppContractsV1";

  const defaults = {
    cinemas: [
      {
        id: "cin-1",
        name: "Cinema di esempio",
        address: "Via Roma 1",
        city: "Roma"
      }
    ],
    workTypes:
      typeof DEFAULT_WORK_TYPES !== "undefined"
        ? DEFAULT_WORK_TYPES
        : [],
    contracts:
      typeof DEFAULT_CONTRACT_DATABASE !== "undefined"
        ? DEFAULT_CONTRACT_DATABASE
        : []
  };

  const clone = value =>
    JSON.parse(JSON.stringify(value));

  const parse = value => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  function load() {
    const savedSetup =
      parse(localStorage.getItem(KEY)) ||
      parse(localStorage.getItem(LEGACY_KEY));

    const data =
      savedSetup && typeof savedSetup === "object"
        ? savedSetup
        : clone(defaults);

    const savedContracts =
      parse(localStorage.getItem(DB_KEY));

    if (
      Array.isArray(savedContracts) &&
      savedContracts.length
    ) {
      data.contracts = savedContracts;
      data.contractsSource = "manual-upload";
    }

    if (!Array.isArray(data.cinemas)) {
      data.cinemas = clone(defaults.cinemas);
    }

    if (!Array.isArray(data.workTypes)) {
      data.workTypes = clone(defaults.workTypes);
    }

    if (!Array.isArray(data.contracts)) {
      data.contracts = clone(defaults.contracts);
    }

    return data;
  }

  function save(data) {
    const setupCopy = { ...data };

    if (
      Array.isArray(data.contracts) &&
      data.contracts.length
    ) {
      localStorage.setItem(
        DB_KEY,
        JSON.stringify(data.contracts)
      );

      setupCopy.contractsSaved = true;
    }

    try {
      localStorage.setItem(
        KEY,
        JSON.stringify(setupCopy)
      );

      localStorage.removeItem(LEGACY_KEY);
    } catch (error) {
      delete setupCopy.contracts;

      localStorage.setItem(
        KEY,
        JSON.stringify(setupCopy)
      );

      if (
        error &&
        error.name !== "QuotaExceededError"
      ) {
        throw error;
      }
    }
  }

  function reset() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
    localStorage.removeItem(DB_KEY);

    const data = clone(defaults);
    save(data);

    return load();
  }

  return {
    load,
    save,
    reset,
    defaults
  };
})();
