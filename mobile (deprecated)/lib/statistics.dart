import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

SizedBox smallSizedBox = SizedBox(height: 10);
SizedBox bigSizedBox = SizedBox(height: 20);

class Statistics extends StatefulWidget {
  @override
  _StatisticsState createState() => _StatisticsState();
}

// TODO Add the expanding widget for details about the case
// TODO Make the statistic number centered properly on pixel
// TODO Make the statistic container width bigger
class _StatisticsState extends State<Statistics> {
  String _totalConfirmed;
  String _totalDeaths;
  String _totalRecovered;
  String _totalActive;
  String _totalActiveMild;
  String _totalActiveSerious;
  String _totalClosed;
  String _totalClosedRecovered;
  String _totalClosedDeaths;

  @override
  void initState() {
    super.initState();
    String url = 'https://coronastats-backend.herokuapp.com/stats';
    http.get(url).then((http.Response response) {
      print('Response: ' +
          response.body +
          ' Status code: ' +
          response.statusCode.toString());
      final responseJson = json.decode(response.body);
      setState(() {
        _totalConfirmed = responseJson['cases'];
        _totalDeaths = responseJson['deaths'];
        _totalRecovered = responseJson['recovered'];
        _totalActive = responseJson['active']['total'];
        _totalActiveMild = responseJson['active']['mild'];
        _totalActiveSerious = responseJson['active']['serious'];
        _totalClosed = responseJson['closed']['total'];
        _totalClosedRecovered = responseJson['closed']['recovered'];
        _totalClosedDeaths = responseJson['closed']['deaths'];
      });
    });
  }

  Future<void> _refreshData() async {
    print('Refreshing data');
    initState();
    print('Updated data');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff171717),
      body: Container(
        child: RefreshIndicator(
          onRefresh: _refreshData,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(top: 18, left: 20, bottom: 10),
                child: Text(
                  'Statistics',
                  style: TextStyle(
                    color: Color(0xffDDDDDD),
                    fontWeight: FontWeight.w500,
                  ),
                  textScaleFactor: 2,
                ),
              ),
              Expanded(
                child: ListView(
                  children: <Widget>[
                    DataTile(
                      name: 'total confirmed',
                      data: _totalConfirmed,
                      textColor: Color(0xffFF6262),
                    ),
                    bigSizedBox,
                    DataTile(
                      name: 'total deaths',
                      data: _totalDeaths,
                      textColor: Color(0xffB9B9B9),
                    ),
                    bigSizedBox,
                    DataTile(
                      name: 'total recovered',
                      data: _totalRecovered,
                      textColor: Color(0xff71FFAE),
                    ),
                    bigSizedBox,
                    Container(
                      child: Column(
                        children: <Widget>[
                          DataTile(
                            name: 'active',
                            data: _totalActive,
                            textColor: Color(0xffFFD371),
                          ),
                          smallSizedBox,
                          DataTileDetails(
                            name: 'mild condition',
                            data: _totalActiveMild,
                            textColor: Color(0xffFFD371),
                          ),
                          smallSizedBox,
                          DataTileDetails(
                            name: 'serious condition',
                            data: _totalActiveSerious,
                            textColor: Color(0xffFFD371),
                          ),
                        ],
                      ),
                    ),
                    bigSizedBox,
                    Container(
                      child: Column(
                        children: <Widget>[
                          DataTile(
                            name: 'closed',
                            data: _totalClosed,
                            textColor: Color(0xff71E5FF),
                          ),
                          smallSizedBox,
                          DataTileDetails(
                            name: 'recovered',
                            data: _totalClosedRecovered,
                            textColor: Color(0xff71E5FF),
                          ),
                          smallSizedBox,
                          DataTileDetails(
                            name: 'deaths',
                            data: _totalClosedDeaths,
                            textColor: Color(0xff71E5FF),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(height: 20),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class DataTileDetails extends StatelessWidget {
  const DataTileDetails({
    @required String name,
    @required String data,
    @required Color textColor,
  })  : _name = name,
        _data = data,
        _textColor = textColor;

  final String _name;
  final String _data;
  final Color _textColor;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 18),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xff3B3B3B),
            Color(0xff1C1C1C),
          ],
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      height: MediaQuery.of(context).size.height * 0.09,
      width: MediaQuery.of(context).size.width * 1,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Text(
              _name.toUpperCase(),
              style: TextStyle(
                letterSpacing: 5,
                color: Color(0xffD0D0D0),
                fontWeight: FontWeight.w700,
              ),
              textScaleFactor: 0.8,
            ),
            Text(
              _data,
              style: TextStyle(
                color: _textColor,
                fontWeight: FontWeight.w700,
              ),
              textScaleFactor: 2.5,
            ),
          ],
        ),
      ),
    );
  }
}

/// Contains data and statistics to be displayed.
class DataTile extends StatelessWidget {
  String data;
  String name;
  Color textColor;
  Function onTap;

  DataTile({
    @required this.name,
    @required this.data,
    @required this.textColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 18),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xff3B3B3B),
                Color(0xff1C1C1C),
              ],
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          height: MediaQuery.of(context).size.height * 0.25,
          width: MediaQuery.of(context).size.width * 1,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(top: 16, left: 16),
                child: Text(
                  name.toUpperCase(),
                  style: TextStyle(
                    letterSpacing: 5,
                    color: Color(0xffD0D0D0),
                    fontWeight: FontWeight.w700,
                  ),
                  textScaleFactor: 0.8,
                ),
              ),
              Center(
                child: Container(
                  margin: EdgeInsets.all(36),
                  child: Text(
                    data ??= '',
                    style: TextStyle(
                      color: textColor,
                      fontWeight: FontWeight.w700,
                    ),
                    textScaleFactor: 3.5,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
