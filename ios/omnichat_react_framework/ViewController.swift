//
//  ViewController.swift
//  omnichat_react_framework
//
//  Created by Hex on 08.06.2021.
//

import UIKit

import React

public class Sum {
    public static func plus(a : Int, b: Int) -> Int {
        return a + b
    }
}
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func tapped(_ sender: UIButton) {
        NSLog("Hello")
        let path = FileManager.default.urls(for: .documentDirectory,
                                                        in: .userDomainMask)[0].appendingPathComponent("index.bundle")

        let urlString = "http://192.168.69.87:80/main.jsbundle"



        NSLog(urlString)
        NSLog(path.absoluteString)
        // 2
        if let imageUrl = URL(string: urlString) {
            // 3
            URLSession.shared.downloadTask(with: imageUrl) { (tempFileUrl, response, error) in

                // 4
                if let imageTempFileUrl = tempFileUrl {
                    do {
                        if let str = try? String(contentsOf: imageTempFileUrl) {
                            try str.write(to: path, atomically: true, encoding: .utf8)
                            do {
                                print(try String(contentsOf: path))
                            } catch {
                                print("ERROR READ FROM FILE")
                            }
                        }
                    } catch {
                        print("Error")
                    }
                }
            }.resume()
        }
    }


    @IBAction func start(_ sender: UIButton) {
        let path = URL(string: "http://192.168.69.99:8081/index.bundle?platform=ios")
//        let path = FileManager.default.urls(for: .documentDirectory,
//                                                        in: .userDomainMask)[0].appendingPathComponent("index.bundle")
        let mockData:NSDictionary = ["scores":
            [
                ["name":"Alex", "value":"42"],
                ["name":"Joel", "value":"10"]
            ]
        ]

        let rootView = RCTRootView(
            bundleURL: path!,
            moduleName: "omnichat_sdk_react_native",
            initialProperties: mockData as [NSObject : AnyObject],
            launchOptions: nil
        )
        let vc = UIViewController()
        vc.view = rootView
        self.present(vc, animated: true, completion: nil)
    }
}


