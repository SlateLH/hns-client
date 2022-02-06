import React from 'react';

import IServer from '../../models/IServer';
import ServerBrowserTable from './ServerBrowserTable/ServerBrowserTable';

interface Props {
  onServerJoin: (server: IServer) => void;
}

function ServerBrowserContainer({ onServerJoin }: Props) {
  const servers = [
    {
      name: 'LOCALHOST',
      host: 'localhost',
      port: 42069,
    },
    {
      name: 'LAN',
      host: '192.168.1.64',
      port: 42069,
    },
    {
      name: 'calebjett.net',
      host: 'calebjett.net',
      port: 40040,
    },
  ];

  return (
    <div className="flex flex-col items-center my-10 border border-gray-700 shadow-lg shadow-gray-600 bg-gray-600 w-fit rounded-xl mx-auto p-5">
      <h1 className="font-semibold text-xl text-white">Server Browser</h1>
      <ServerBrowserTable servers={servers} onServerJoin={onServerJoin} />
    </div>
  );
}

export default ServerBrowserContainer;
