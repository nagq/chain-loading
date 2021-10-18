"use strict";

import React, { useEffect, useState } from "react";

// Execute promise in sequence until one of them is fulfilled or the end of sequence
const PromiseChain = (promiseArray) => {
  promiseArray = promiseArray.map(item => {
    return item.loader ? item : { loader: item }
  });
  const [first, ...others] = promiseArray;
  const { loader: firstLoader } = first;

  let failedIndex = -1;
  const promise = others.reduce((promise, current, currentIndex) => {
    return promise.then((data) => {
      return data;
    }).catch(() => {
      failedIndex++;
      return current.loader();
    })
  }, firstLoader());

  return {
    promise,
    failedIndex: () => failedIndex
  }
};

function resolve(obj) {
  return obj && obj.__esModule ? obj.default : obj;
}

function render(loaded, props) {
  return React.createElement(resolve(loaded), props);
}

const Loader = function(options) {
  if (!options.loaders) {
    throw Error('options loaders is required!')
  }
  const chain = Array.isArray(options.loaders) ? options.loaders : [options.loaders];

  let state = null;

  function init() {
    if (!state) {
      state = {
        loading: true,
        loaded: null,
        error: null,
        attrs: {}
      };

      const promiseChain = PromiseChain(chain);
      const { promise, failedIndex } = promiseChain;

      state.promise = promise.then((data) => {
        state.loading = false;
        state.loaded = data;
        if (failedIndex() < chain.length - 1) {
          const { loader, ...attrs } = chain[failedIndex() + 1];
          state.attrs = attrs
        }
        return data;
      }).catch((error) => {
        state.loading = false;
        state.error = error;
        throw error;
      })
    }
  }

  const ChainLoaderComponent = React.forwardRef((props, ref) => {
    const [loadState, setLoadState] = useState({ ...state });

    useEffect(() => {
      init();

      state.promise.then(() => {
        setLoadState({
          ...state.attrs,
          loading: state.loading,
          loaded: state.loaded,
        })
      }).catch(() => {
        setLoadState({
          loading: state.loading,
          error: state.error,
        })
      });
    }, [])

    if (loadState.loading) {
      if (!options.loading) {
        return null;
      }
      return React.createElement(options.loading, {
        isLoading: loadState.loading,
        ref,
      });
    }

    if (loadState.error) {
      if (!options.error) {
        return null;
      }
      return React.createElement(options.error, {
        isLoading: loadState.loading,
        error: loadState.error
      });
    }

    if (loadState.loaded) {
      if (!options.debug) {
        return render(loadState.loaded, {
          ...props,
          ref
        })
      }

      const { loaded, loading, ...attrs } = loadState;
      const dataAttrs = {
        'data-name': options.name
      };
      Object.keys(attrs).map((key) => {
        return dataAttrs[`data-${key}`] = attrs[key];
      });

      return (
        <div {...dataAttrs}>
          {
            render(loaded, {
              ...props,
              ref
            })
          }
        </div>
      );
    }

    return null;
  });
  if (options.name) {
    ChainLoaderComponent.displayName = `${options.name} [ChainLoaderComponent]`;
  }
  return ChainLoaderComponent;
}

export default Loader
