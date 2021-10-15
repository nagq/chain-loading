import  { useEffect, useState } from "react";

export const useConfig = (init = {}) => {
  const [config, setConfig] = useState(init);

  useEffect(() => {
    setTimeout(() => {
      setConfig({
        data: {
          example: {
            package: 'example-1'
          }
        }
      })
    }, 4000);
    setTimeout(() => {
      setConfig({
        data: {
          example: {
            package: 'example-2'
          }
        }
      })
    }, 8000);
    setTimeout(() => {
      setConfig({
        data: {
          example: {
            package: 'example-3'
          }
        }
      })
    }, 12000);
    setTimeout(() => {
      setConfig({
        data: {
          example: {
            package: 'example-5'
          }
        }
      })
    }, 16000)
  }, []);

  return config;
}
