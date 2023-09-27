/* eslint-disable max-len */
import { devices } from '@playwright/test';

export const viewport = {
  mobile: devices['iPhone 13 Pro'].viewport,
  xl: { width: 1600, height: 1000 },
};

export const maskColor = '#4299E1'; // blue.400

export const adsBannerSelector = '.adsbyslise';

export const featureEnvs = {
  beaconChain: [
    { name: 'NEXT_PUBLIC_HAS_BEACON_CHAIN', value: 'true' },
  ],
  rollup: [
    { name: 'NEXT_PUBLIC_IS_L2_NETWORK', value: 'true' },
    { name: 'NEXT_PUBLIC_L1_BASE_URL', value: 'https://localhost:3101' },
    { name: 'NEXT_PUBLIC_L2_WITHDRAWAL_URL', value: 'https://localhost:3102' },
  ],
  bridgedTokens: [
    {
      name: 'NEXT_PUBLIC_BRIDGED_TOKENS_CHAINS',
      value: '[{"id":"1","title":"Ethereum","short_title":"ETH","base_url":"https://eth.blockscout.com/token/"},{"id":"56","title":"Binance Smart Chain","short_title":"BSC","base_url":"https://bscscan.com/token/"},{"id":"99","title":"POA","short_title":"POA","base_url":"https://blockscout.com/poa/core/token/"}]',
    },
    {
      name: 'NEXT_PUBLIC_BRIDGED_TOKENS_BRIDGES',
      value: '[{"type":"omni","title":"OmniBridge","short_title":"OMNI"},{"type":"amb","title":"Arbitrary Message Bridge","short_title":"AMB"}]',
    },
  zkRollup: [
    { name: 'NEXT_PUBLIC_IS_L2_NETWORK', value: 'true' },
    { name: 'NEXT_PUBLIC_IS_ZKEVM_L2_NETWORK', value: 'true' },
    { name: 'NEXT_PUBLIC_L1_BASE_URL', value: 'https://localhost:3101' },
    { name: 'NEXT_PUBLIC_L2_WITHDRAWAL_URL', value: 'https://localhost:3102' },
  ],
};

export const viewsEnvs = {
  block: {
    hiddenFields: [
      { name: 'NEXT_PUBLIC_VIEWS_BLOCK_HIDDEN_FIELDS', value: '["burnt_fees", "total_reward", "nonce"]' },
    ],
  },
};
