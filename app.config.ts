import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config as ExpoConfig,
    android: {
        package: "com.anonymous.nopestsallowed",
        config: {
            googleMaps: {
                apiKey:  process.env.GGMAPS_API_KEY,
            },
        },
    },
});
