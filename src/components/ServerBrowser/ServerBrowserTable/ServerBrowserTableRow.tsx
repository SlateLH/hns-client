import React from 'react';

import IServer from '../../../models/IServer';

interface Props {
  index: number;
  server: IServer;
  onServerJoin: (server: IServer) => void;
}

function ServerBrowserTableRow({ index, server, onServerJoin }: Props) {
  const { name, host, port } = server;

  function onJoinButtonClick() {
    onServerJoin(server);
  }

  return (
    <tr
      className={`grid grid-rows-1 grid-cols-2 gap-x-10 items-center border px-10 py-2 hover:bg-blue-100 transition w-full ${
        index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
      }`}
    >
      <td className="font-semibold text-center">{name}</td>
      <td>
        <button
          className="border border-gray-400 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition px-5 py-1 rounded"
          onClick={onJoinButtonClick}
        >
          Join Server
        </button>
      </td>
    </tr>
  );
}

export default ServerBrowserTableRow;
