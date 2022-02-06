import React from 'react';

import IServer from '../../../models/IServer';
import ServerBrowserTableHeaders from './ServerBrowserTableHeaders';
import ServerBrowserTableRow from './ServerBrowserTableRow';

interface Props {
  servers: IServer[];
  onServerJoin: (server: IServer) => void;
}

function ServerBrowserTable({ servers, onServerJoin }: Props) {
  return (
    <table className="border border-gray-500 mt-5">
      <thead>
        <ServerBrowserTableHeaders />
      </thead>
      <tbody>
        {servers.map((server, index) => (
          <ServerBrowserTableRow
            key={`${server.host}:${server.port}`}
            index={index}
            server={server}
            onServerJoin={onServerJoin}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ServerBrowserTable;
