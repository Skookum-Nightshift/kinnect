//
//  FacebookLoginManager.m
//  Kinnect
//
//  Created by Jonathan Gertig on 4/18/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "FacebookLoginManager.h"
#import "FBSDKCoreKit/FBSDKCoreKit.h"
#import "FBSDKLoginKit/FBSDKLoginKit.h"

@implementation FacebookLoginManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(newSession:(RCTResponseSenderBlock)callback) {
  FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
  [login logInWithReadPermissions:@[@"public_profile", @"email", @"user_photos"] handler:^(FBSDKLoginManagerLoginResult *loginResult, NSError *error) {

    if (error) {
      callback(@[@"Error", [NSNull null]]);
    } else if (loginResult.isCancelled) {
      callback(@[@"Canceled", [NSNull null]]);
    } else {
      FBSDKAccessToken *token = loginResult.token;
      if ([FBSDKAccessToken currentAccessToken]) {
        [[[FBSDKGraphRequest alloc] initWithGraphPath:@"me" parameters:nil]
          startWithCompletionHandler:^(FBSDKGraphRequestConnection *connection, NSDictionary *result, NSError *error) {
            if (error) {
              callback(@[@"Error", [NSNull null]]);
            } else {
//              NSLog(@"fetched user:%@", result);
              NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
              [dateFormat setDateFormat:@"yyyy-MM-dd'T'HH:mm:ss.SSS"];

              NSString *tokenString = token.tokenString;
              NSString *expirationDate = [dateFormat stringFromDate:token.expirationDate];
              NSString *userId = token.userID;
              NSString *userName = result[@"name"];
              NSString *userEmail = result[@"email"];
              NSDictionary *credentials = @{
                @"token" : tokenString,
                @"tokenExperation" : experationDate,
                @"userId" : userId,
                @"userName": userName,
                @"userEmail": userEmail
              };
              callback(@[[NSNull null], credentials]);
            }
        }];
      }

    }
  }];
};

@end
