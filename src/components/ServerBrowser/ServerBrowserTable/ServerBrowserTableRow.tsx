import React from 'react';

import IServer from '../../../models/IServer';
import Button from '../../../ui/Button';

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
        <Button text="Join Server" onClick={onJoinButtonClick} />
      </td>
    </tr>
  );
}

export default ServerBrowserTableRow;
