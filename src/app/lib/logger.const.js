const logCodes = {
  DATA_FETCH_ERROR: 'data_fetch_error',
  DATA_NOT_FOUND: 'data_response_404',
  DATA_REQUEST_RECEIVED: 'data_request_received',
  LOCAL_SENDFILE_ERROR: 'local_sendfile_error',
  MANIFEST_SENDFILE_ERROR: 'server_sendfile_error_manifest',
  NO_MEDIA_BLOCK: 'no_media_block',
  NO_TRANSLATION_FOUND: 'no_translation_found',
  ROUTING_INFORMATION: 'routing_info',
  SERVER_LISTEN_ERROR: 'server_listen_error',
  SERVER_SIDE_RENDER_REQUEST_RECEIVED: 'ssr_request_received',
  SERVER_SIDE_REQUEST_FAILED: 'ssr_request_failed',
  SERVICE_WORKER_SENDFILE_ERROR: 'server_sendfile_error_sw',
  UNSUPPORTED_BLOCK_TYPE: 'unsupported_block_type',
};

module.exports = logCodes;
