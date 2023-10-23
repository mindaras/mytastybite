interface Props {
  baseUrl: string;
  getDefaultHeaders?: () => object;
}

interface Options extends RequestInit {
  mapData?: boolean;
}

const createApi = ({ baseUrl, getDefaultHeaders }: Props) => {
  const request = async <T = any>(
    path: string,
    options: Options = {}
  ): Promise<T> => {
    const defaultHeaders = getDefaultHeaders?.() || {};
    const headers = options.headers || {};
    const mapData = options.mapData ?? true;

    try {
      const response = await fetch(`${baseUrl}/api${path}`, {
        ...options,
        headers: { ...defaultHeaders, ...headers },
      });
      const data = await response.json();
      return mapData ? data?.data : data;
    } catch (err) {
      return null as T;
    }
  };

  const get = async <T = any>(path: string, options?: Options): Promise<T> => {
    return request(path, options);
  };

  const post = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  };

  const postRaw = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "POST",
      body: body,
      ...options,
    });
  };

  const put = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  };

  const putRaw = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "PUT",
      body: body,
      ...options,
    });
  };

  const patch = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    });
  };

  const patchRaw = async <T = any>(
    path: string,
    body?: any,
    options?: Options
  ): Promise<T> => {
    return request(path, {
      method: "PATCH",
      body: body,
      ...options,
    });
  };

  const del = async <T = any>(path: string, options?: Options): Promise<T> => {
    return request(path, { method: "DELETE", ...options });
  };

  return { get, post, postRaw, put, putRaw, patch, patchRaw, del };
};

export { createApi };
