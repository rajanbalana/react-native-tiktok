#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Tiktok, NSObject)
  RCT_EXTERN_METHOD(auth: (NSString)state scopes:(NSString)scopes callback:(RCTResponseSenderBlock)callback)
  RCT_EXTERN_METHOD(share: (NSString)path callback: (RCTResponseSenderBlock)callback)
  RCT_EXTERN_METHOD(shareAsset: (NSString)assetId callback: (RCTResponseSenderBlock)callback)
@end
