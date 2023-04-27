/// -----------------------------------
///          External Packages
/// -----------------------------------

import 'package:flutter/material.dart';

import 'package:auth0_flutter/auth0_flutter.dart';

import 'package:qr_code_scanner/qr_code_scanner.dart';

const appScheme = 'eventpromobile';

/// -----------------------------------
///           Profile Widget
/// -----------------------------------
class Profile extends StatelessWidget {
  final Future<void> Function() logoutAction;
  final UserProfile? user;
  final GlobalKey _gLobalkey;
  final Barcode? result;
  final Function(QRViewController) qr;

  Profile(this.logoutAction, this.user, this._gLobalkey, this.qr, this.result,
      {final Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Padding(
        padding: const EdgeInsets.all(5.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.blue, width: 1),
                shape: BoxShape.circle,
                image: DecorationImage(
                  fit: BoxFit.fill,
                  image: NetworkImage(user?.pictureUrl.toString() ?? ''),
                ),
              ),
            ),
            const SizedBox(width: 8),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const SizedBox(height: 16),
                Text('${user?.name}',
                    style: TextStyle(
                      color: Colors.blue,
                      fontSize: 18.0,
                    )),
                const SizedBox(height: 2),
                ElevatedButton(
                  onPressed: () async {
                    await logoutAction();
                  },
                  child: const Text('Logout'),
                ),
              ],
            )
          ],
        ),
      ),
      Flexible(
        child: Container(
          height: 400,
          width: 400,
          child: QRView(key: _gLobalkey, onQRViewCreated: qr),
        ),
      ),
      ElevatedButton(
        onPressed: result != null
            ? () {
                // do something with the result
              }
            : null,
        child:
            (result != null) ? Text('Submit Attendance') : Text('Scan a code'),
      ),
    ]);
  }
}

/// -----------------------------------
///            Login Widget
/// -----------------------------------
class Login extends StatelessWidget {
  final Future<void> Function() loginAction;
  final String loginError;

  const Login(this.loginAction, this.loginError, {final Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(
          onPressed: () async {
            await loginAction();
          },
          child: const Text('Login'),
        ),
        Text(loginError ?? ''),
      ],
    );
  }
}

/// -----------------------------------
///                 App
/// -----------------------------------

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

/// -----------------------------------
///              App State
/// -----------------------------------

class _MyAppState extends State<MyApp> {
  Credentials? _credentials;
  late Auth0 auth0;

  bool isBusy = false;
  late String errorMessage;

  late GlobalKey _gLobalkey;
  QRViewController? controller;
  Barcode? result;
  void qr(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((event) {
      setState(() {
        result = event;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EventPro Mobile',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('EventPro Mobile'),
        ),
        body: Center(
          child: isBusy
              ? const CircularProgressIndicator()
              : _credentials != null
                  ? Profile(
                      logoutAction, _credentials?.user, _gLobalkey, qr, result)
                  : Login(loginAction, errorMessage),
        ),
      ),
    );
  }

  Future<void> loginAction() async {
    setState(() {
      isBusy = true;
      errorMessage = '';
    });

    try {
      final Credentials credentials =
          await auth0.webAuthentication(scheme: appScheme).login();

      setState(() {
        isBusy = false;
        _credentials = credentials;
      });
    } on Exception catch (e, s) {
      debugPrint('login error: $e - stack: $s');

      setState(() {
        isBusy = false;
        errorMessage = e.toString();
      });
    }
  }

  Future<void> logoutAction() async {
    await auth0.webAuthentication(scheme: appScheme).logout();

    setState(() {
      _credentials = null;
    });
  }

  @override
  void initState() {
    super.initState();

    auth0 = Auth0('dev-ocj0rgmusw7m0hn7.us.auth0.com',
        'kfs3MfTcr6XcoAoxE3Fu4Iawzky5IQR1');
    errorMessage = '';
    _gLobalkey = GlobalKey();
  }
}
