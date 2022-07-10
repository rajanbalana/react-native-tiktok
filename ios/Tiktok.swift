import Foundation
import TikTokOpenSDK
import Photos

@objc(Tiktok)
class Tiktok: UIViewController {
    
  @objc
    func auth(_ state:String ,scopes:String , callback: @escaping RCTResponseSenderBlock) {
    let scopes = [scopes] // list your scopes
    let scopesSet = NSOrderedSet(array:scopes)
    let request = TikTokOpenSDKAuthRequest()
    request.permissions = scopesSet
    request.state = state;

    DispatchQueue.main.async {
        request.send(self, completion: { resp -> Void in
            let grantedPermissions = (resp.grantedPermissions?.array as? [String])?.joined(separator:",") ?? "";
            callback([
                ["status": resp.errCode.rawValue, "code": resp.code,"state": resp.state,"grantedPermissions": grantedPermissions ]
            ])
      })
    }
  }
  
  @objc
  func share(_ path: String, callback: @escaping RCTResponseSenderBlock) {
    PHPhotoLibrary.shared().performChanges({
      let asset = PHAssetCreationRequest.forAsset()
      asset.addResource(with: .video, fileURL: URL(string: path)!, options: nil)
      let newImageIdentifier = asset.placeholderForCreatedAsset?.localIdentifier

      let request = TikTokOpenSDKShareRequest()
      request.mediaType = TikTokOpenSDKShareMediaType.video;
      request.localIdentifiers = [newImageIdentifier!]
      DispatchQueue.main.async {
        request.send(completionBlock: { resp -> Void in
          callback([resp.errCode.rawValue])
        })
      }
    })
  }
}
