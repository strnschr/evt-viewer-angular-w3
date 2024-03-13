export const buildGatewayURL = (cid: string, filePath?: string) =>
  `https://${cid}.ipfs.w3s.link${filePath ? `/${filePath}` : ''}`;
