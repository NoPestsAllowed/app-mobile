import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config as ExpoConfig,
    android: {
        config: {
            googleMaps: {
                apiKey:  process.env.GGMAPS_API_KEY,
            },
        },
    },
});
