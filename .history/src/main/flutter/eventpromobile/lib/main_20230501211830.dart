/// -----------------------------------
///          External Packages
/// -----------------------------------

import 'package:flutter/material.dart';

import 'package:auth0_flutter/auth0_flutter.dart';

import 'package:qr_code_scanner/qr_code_scanner.dart';

import 'package:http/http.dart' as http;

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
  final Future<void> Function() sendRequest;

  const Profile(
      this.logoutAction, 
      this.user, 
      this._gLobalkey, 
      this.qr, 
      this.result,
      this.sendRequest,
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
                border: Border.all(color: Colors.black, width: 1),
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
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    )),
                const SizedBox(height: 2),
                ElevatedButton(
                  onPressed: () async {
                    await logoutAction();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey[200],
                  ),
                  child: const Text(
                    'Logout',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 24.0,
                    ),
                  ),
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
      const SizedBox(height: 35),
      ElevatedButton(
        onPressed: result != null
            ? () {
                // do something with the result
                // needs to reset result to null afterwards
              }
            : null,
        style: (result != null)
            ? ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
                fixedSize: const Size(392, 128),
              )
            : ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[200],
                fixedSize: const Size(392, 128),
              ),
        child: (result != null)
            ? const Text(
                'Submit Attendance',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24.0,
                ),
              )
            : const Text(
                'Scan a code',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24.0,
                ),
              ),
      ),
      const SizedBox(height: 10), // Add some space between the buttons
      ElevatedButton(
        onPressed: () async {
          await sendRequest();
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.blue,
        ),
        child: const Text(
          'Send Request',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18.0,
          ),
        ),
      ),
    ]);
  }
}
Future<void> sendRequest() async {
    final response = await http.get(Uri.parse('https://localhost/check_in'));

    if (response.statusCode == 200) {
      // If the server returns a 200 OK response, you can handle the response here
      print('Response data: ${response.body}');
    } else {
      // If the server returns an error, you can throw an exception
      throw Exception('Failed to load data');
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
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        const SizedBox(height: 50),
        Image.asset('assets/images/attendance.png'),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () async {
            await loginAction();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.grey[200],
            fixedSize: const Size(384, 128),
          ),
          child: const Text('Login',
              style: TextStyle(
                color: Colors.black,
                fontSize: 48.0,
              )),
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
          backgroundColor: Colors.grey[200],
          title: const Text('EventPro Mobile',
              style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.black)),
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
