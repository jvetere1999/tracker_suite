import 'package:flutter/material.dart';
import 'package:auth0_flutter/auth0_flutter.dart';

import 'clock.dart';

class MainView extends StatefulWidget {
  const MainView({Key? key}) : super(key: key);

  @override
  State<MainView> createState() => _MainViewState();
}

class _MainViewState extends State<MainView> {
  Credentials? _credentials;

  late Auth0 auth0;

  @override
  void initState() {
    super.initState();
    auth0 = Auth0('dev-ocj0rgmusw7m0hn7.us.auth0.com',
        '4VJyOaNVpCaFte5vrucmPhgyPRRswBUP');
  }

  Future<void> _logout() async {
    await auth0.webAuthentication();
    setState(() {
      _credentials = null;
    });
  }

  void _navigateToNextPage() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NextPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Welcome to EventPro Mobile!',
              style: TextStyle(
                fontFamily: 'Roboto',
                fontSize: 24,
                foreground: Paint()
                  ..shader = LinearGradient(
                    colors: [Colors.blue, Colors.green],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ).createShader(Rect.fromLTWH(0.0, 0.0, 200.0, 70.0)),
              ),
            ),
          ),
          Clock(),
          SizedBox(height: 16),
          if (_credentials == null)
            ElevatedButton(
              onPressed: () async {
                final credentials = await auth0.webAuthentication().login();

                setState(() {
                  _credentials = credentials;
                });

                if (_credentials != null) {
                  _navigateToNextPage();
                }
              },
              child: const Text("Log in"),
            )
          else
            Column(
              children: [
                Text(_credentials!.accessToken),
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _logout,
                  child: const Text("Log out"),
                ),
              ],
            ),
        ],
      ),
    );
  }
}

class NextPage extends StatelessWidget {
  const NextPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Next Page'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go Back'),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: MainView(),
  ));
}
