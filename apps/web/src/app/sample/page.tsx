'use client';

import { ISample } from '@/interface/sample.interface';
import instance from '@/utils/axiosInstance';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Samples(props: ISample) {
  const [data, setData] = useState([]);
  useEffect(() => {
    instance
      .get('/samples/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>FETCH DATA</h1>
      <div>
        {data?.length > 0 &&
          data.map((user, index) => (
            <div key={index}>
              <div>{user.id}</div>
              <div>{user.name}</div>
              <div>{user.code}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Samples;
