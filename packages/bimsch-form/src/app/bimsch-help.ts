/***************************************************************************************************
 * CALLBACK function from bol-functions.js/bol-globals.js
 * bol library looks for a msgid in bol__project_strings and shows the help message
***************************************************************************************************/
const bol__project_strings = [
    {msgid: "sidehlp_save", msg: 'Sie können das Formular in Ruhe auf Ihrem Gerät ausfüllen. Während des Ausfüllens gibt es keine Verbindung zu einem Server und es werden keine Daten übermittelt. ' +
                                'Erst mit Absenden des Formulars werden die Daten an die zuständige Behörde übermittelt und erst mit der Übermittlung werden Dateianhänge von Ihrem Gerät geladen und gesendet. Dabei erfolgt keine Speicherung der eingebenen Daten.' +
                                '<br><u><b>Speicherung:</b></u><br>' +
                                'Wenn Sie das Ausfüllen unterbrechen möchten, um z.B. an einem anderen Tag oder einem anderen Gerät mit dem Ausfüllen fortzufahren, ist es notwendig, die Einwilligung zur Datenspeicherung zu geben. ' +
                                'Wenn ja, wird der jeweilige Stand des Formulars zentral gespeichert. Dazu erscheint eine Schaltfläche "Speichern und Beenden". Bei Betätigung erfolgt die Speicherung und das Formular erhält im Portal den Status "OFFEN". ' +
                                'Damit können Sie jederzeit mit der Bearbeitung fortfahren. Wichtig: Mit dieser Speicherung werden keine Anhänge gespeichert!<br>' +
                                'Ist die Bestätigung auch bei der finalen Übermittlung aktiv, werden die Daten des Formulars ebenso gespeichert. Somit ist es möglich, dass ein eingereichtes Dokument als Vorlage Verwendung finden kann.'},
    {msgid: "sidehlp_31_1", msg: 'Wenn Sie eine Anlage nach der Industrieemissionsrichtlinie betreiben, müssen Sie jährlich eine Zusammenfassung der Emissionsüberwachung und sonstige Daten, die zur Überprüfung der Genehmigungsanforderungen nach ' +
                                 '§ 6 Abs. 1 Nr. 1 des Bundes-Immissionsschutzgesetzes erforderlich sind, vorlegen. Wenn Sie die benötigten Angaben Ihrer Behörde bereits aufgrund anderer Vorschriften vorlegen, besteht die Pflicht für Sie nicht. <br>' +
                                 '<a href="https://www.gesetze-im-internet.de/bimschg/__31.html" target="_blank"> Zum Gesetz </a>'},
    {msgid: "sidehlp_31_1files", msg: '<b>Hinweis</b>:<br> Wenn von Abfragen Teile für die jährliche Auskunft zutreffen, müssen Sie zu jeder Frage angeben, wie viele Messberichte bzw. Dokumente Sie hochladen möchten. ' + 
                                'Dies variiert je nach Berichtstyp und Anforderung des jeweiligen Bundeslands. <br>Eine Angabe von <b>0</b> bedeutet, dass die Dokumente der zuständigen Überwachungsbehörde bereits vorliegen. ' +
                                'Wollen Sie dazu zusätzliche bzw. aktuellere Dokumente einreichen, müssen Sie nur die entsprechende Anzahl wählen. <br><br>' +
                                'Bei <b>weitere erforderliche Dokumente</b> müssen Sie zusätzlich einen Titel/Kurzbeschreibung des zu ladenden Dokuments angeben.<br><br>' +
                                'Das eigentliche Hochladen erfolgt erst mit dem finalen Absenden/Einreichen dieses Formulars. Auf dem Reiter <b>Dateianhänge</b> sind alle entsprechenden Felder zusammengefasst.'},

    {msglng: "de", msgid: "hlp_operator", msg: "Der Begriff des Betreibers beschreibt, wer rechtlich für den Anlagenbetrieb verantwortlich ist. Dies kann eine natürliche Person oder auch eine juristische Person (z.B. eine AG oder GmbH) sein. Ein Betreiber kann eine oder mehrere Betriebsstätten haben."},
    {msgid: "hlp_operator.name", msg: "Bitte nennen Sie den offiziellen Namen, zum Beispiel der Firma."},
    {msgid: "hlp_operator.address", msg: "Bitte geben Sie die offizielle Anschrift des Betreibers an."},

    {msgid: "hlp_operatingSite", msg: "Die Betriebsstätte steht für alle Anlagen eines Betreibers an einem Standort. Wenn Sie  mehrere Anlagen an einem Ort betreiben, haben diese Anlagen i.d.R. eine identische Betriebsstätten-Nummer."},
    {msgid: "hlp_operatingSite.name", msg: "Bitte nennen Sie den Namen der Betriebsstätte, zum Beispiel des Firmenstandorts."},
    {msgid: "hlp_operatingSite.nr", msg: "Die Betriebsstätten-Nummer, auch Arbeitsstätten-Nummer genannt, erhalten Sie von der zuständigen Aufsichtsbehörde. Sie identifiziert Ihre Betriebsstätte eindeutig."},
    {msgid: "hlp_operatingSite.naceCode.code", msg: "Die Nomenklatur der Wirtschaftstätigkeiten (NACE) ist die europäische statistische Klassifikation der Wirtschaftstätigkeiten. Bitte geben Sie Ihren passenden NACE-Code ein. Die Übersicht finden Sie unter folgendem <a href='https://ec.europa.eu/eurostat/documents/3859598/5902453/KS-RA-07-015-DE.PDF' target='_blank'> Link </a>."},
    {msgid: "hlp_operatingSite.address", msg: "Bitte geben Sie die offizielle Anschrift der Betriebsstätte an, falls diese zu den Angaben zum Betreiber abweicht."},

    {msgid: "hlp_plant.name", msg: "Die Anlagenbezeichnung wurde betriebsintern festgelegt. Sie können sie i.d.R. auch dem Genehmigungsbescheid für die Anlage entnehmen."},
    {msgid: "hlp_plant.nr", msg: "Die Anlagennummer dient der Identifikation einer Anlage bzw. der systematischen Unterscheidung von mehreren Anlagen innerhalb eines Standortes. Sie wird i.d.R. in den Formularen zum Genehmigungsantrag angegeben."},
    {msgid: "hlp_plant.approvalNumber67", msg: "Das Aktenzeichen der Genehmigungsbehörde finden Sie auf dem ersten Genehmigungsbescheid Ihrer Anlage oder dem Feststellungsbescheid bei einer Anzeige nach § 67, ggf. in Verbindung mit einer Anordnung nach § 17 des Bundes-Immissionsschutzgesetzes."},   
    {msgid: "hlp_plant.nrAccordingToAppendix1Of4BImSchV", msg: "Bitte geben Sie die Nummer der genehmigungsbedürftigen Anlage nach Anhang 1 der 4. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes (<a href='http://www.gesetze-im-internet.de/bimschv_4_2013/anhang_1.html' target='_blank'>BImSchV</a>) an. <br>Sie finden diese Nummer in Ihrer Genehmigung."},
    {msgid: "hlp_plant.nrAccordingToIEDirective", msg: "Bitte geben Sie die Nummer der Tätigkeit nach Anhang I der Industrieemissionsrichtlinie 2010/75/EU (IED) der Europäischen Union an. <a href='https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=uriserv%3AOJ.L_.2010.334.01.0017.01.DEU&toc=OJ%3AL%3A2010%3A334%3ATOC' target='_blank'> Link</a>."},
    {msgid: "hlp_plant.nrAccordingToPRTR", msg: "Bitte geben Sie die Nummer der Tätigkeit nach Anhang I der Verordnung (EG) Nr. 166/2006 über die Schaffung eines Europäischen Schadstofffreisetzungs- und -verbringungsregisters (Pollutant Release and Transfer Register, PRTR). <a href='https://thru.de/fileadmin/SITE_MASTER/content/Dokumente/Downloads/E-PRTR-VO_dt.pdf' target='_blank'>Link</a>."},
    {msgid: "hlp_plant.registryCode", msg: "Falls Ihre Anlage unter die  europäische Emissionshandelsrichtlinie 2003/87/EG, geben Sie bitte die eindeutige Registerkennung im EU-Transaktionsprotokoll an. <a href='https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=OJ:L:2020:423:FULL&from=FR' target='_blank'>Link</a><br> Sie finden die Kennung in Ihrer Genehmigung zur Anlage."},
    {msgid: "hlp_plant.eastValue", msg: "Bitte geben Sie die Koordinaten nach dem Europäischen Terrestrischen Referenzsystem 1989 (ETRS89) mit UTM (Universale-Transversale Mercatorprojektion) an."},
    {msgid: "hlp_plant.northValue", msg: "Bitte geben Sie die Koordinaten nach dem Europäischen Terrestrischen Referenzsystem 1989 (ETRS89) mit UTM (Universale-Transversale Mercatorprojektion) an."},

    {msgid: "hlp_operatorPerson", msg: "Gemeint ist die vertretungsberechtigte Person."},
    {msgid: "hlp_operatingsiteperson", msg: "Falls die Angaben von der Person abweichen, die Sie unter 'Ansprechperson zum Betreiber' angegeben haben: Bitte nennen Sie den Namen und die Funktion der Person, die für den Betriebsbereich verantwortlich ist. Diese Anzeige legt § 7 der Störfall-Verordnung.<br> zum <a href='http://www.gesetze-im-internet.de/bimschv_12_2000/__7.html' target='_blank'>Gesetz</a>"},

    {msgid: "hlp_plantDateStart", msg: "Bitte geben Sie das Datum der Inbetriebnahme oder falls es sich um keine neue Anlage, sondern um eine bestehende Anlage handelt, das Datum dieser Anzeige an."},
    {msgid: "hlp_plantAuthority", msg: "Wenn sich die zuständige Behörde von der Behörde zur Betriebsstätte unterscheidet, wählen Sie bitte die abweichende Behörde zur Anlage aus."},
    {msgid: "hlp_plantGemarkung", msg: "Gemarkungen bestehen aus einigen Grund- beziehungsweise Flurstücken. Im Grundbuch finden Sie die Eigentumsverhältnisse von einzelnen Gemarkungen."},
    
    {msgid: "hlp_plantCategory", msg: "Wenn Sie eine nicht genehmigungsbedürftige, ortsfeste Anlage betreiben, müssen Sie diese Anlagenkategorie Ihrer zuständigen Behörde anzeigen, bevor Sie die Anlage in Betrieb nehmen. <br> zum <a href='https://www.gesetze-im-internet.de/bimschv_20_1998/__8.html' target='_blank'>Gesetz</a>"},
    {msgid: "hlp_plantpart", msg: "Nebeneinrichtungen dienen dem Anlagenzweck und stehen im räumlichen oder betriebstechnischen Zusammenhang mit der Hauptanlage. Sie sind jedoch für den bestimmungsgemäßen Betrieb nicht erforderlich. Es handelt sich zum Beispiel um Lager oder Aufbereitungseinrichtungen, die schädliche Umwelteinwirkungen haben können oder sonstige Gefahren darstellen.<br> zur <a href='https://www.gesetze-im-internet.de/bimschv_4_2013/__1.html' target='_blank'>4. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes</a>"},
    {msgid: "hlp_plantBetriebseinheit", msg: "Die Anlage sowie Anlagenteile sind in Betriebseinheiten unterteilt, die eine oder mehrere gleichartige Teilanlagen, einen oder mehrere gleichartige Anlagenteile oder einen oder mehrere gleichartige Verfahrensabschnitte umfassen können. Bitte geben Sie besonders Betriebseinheiten an, die selbstständig Emissionen verursachen."},

    {msgid: "hlp_plantAddress", msg: "Falls die Angaben zur Adresse der Betriebsstätte abweichen, geben Sie bitte die abweichende Adresse der Anlage hier ein."},
    {msgid: "hlp_plantPerson", msg: "Falls die Angaben zur Ansprechperson der Betriebsstätte abweichen, geben Sie bitte die abweichende Ansprechperson zur Betriebsstätte ein."},
    {msgid: "hlp_plantBImSchV124", msg: "Die 4. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes <a href='http://www.gesetze-im-internet.de/bimschv_4_2013/anhang_1.html' target='_blank'>(4. BImSchV), § 1, Absatz 2</a>, legt genau fest, welche Anlagen eine Genehmigung benötigen. "},
    {msgid: "hlp_plantAggregiert", msg: "Ihre Feuerungsanlage bildet mit weiteren Feuerungsanlagen eine gemeinsame, also aggregierte Anlage, wenn Sie Abgase über einen gemeinsamen Schornstein ableiten (können). Weitere Informationen finden Sie in <a href='https://www.bmuv.de/gesetz/44-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blank'>§ 4 der 44. Verordnung</a> zur Durchführung des Bundes-Immissionsschutzgesetzes (44. BImSchV). "},
    {msgid: "hlp_plantAggregiertAnzahl", msg: "Einzelfeuerungen sind Feuerungsanlagen, die im Gegensatz zu aggregierten Anlagen eine gesonderte, einzelne Anlage darstellen."},
    {msgid: "hlp_plantAggregiertLeistung", msg: "Wenn Ihre Anlage eine aggregierte Anlage ist, ergibt sich der Wert (in Megawatt, MW) aus der gesamten Feuerungswärmeleistung der verbundenen Feuerungsanlagen."},

    {msgid: "hlp_plantWenigeBetriebsstunden", msg: "Für Ihre Gasturbinen- oder Verbrennungsmotoranlage gelten unter bestimmten Voraussetzungen besondere Regelungen. In diesem Fall müssen Sie Ihrer Anzeige eine entsprechende Erklärung beifügen. Weitere Informationen finden Sie in den genannten Paragraphen der 44. BImSchV. <a href='https://www.gesetze-im-internet.de/bimschv_44/BJNR080410019.html' target='_blank'>Zum Gesetz, 44. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes</a>"},
    {msgid: "hlp_plantNotbetrieb", msg: "Für Ihre Gasturbinen- oder Verbrennungsmotoranlage gelten besondere Regelungen, wenn sie ausschließlich dem Notbetrieb dienen. In diesem Fall müssen Sie Ihrer Anzeige eine entsprechende Erklärung beifügen. Weitere Informationen finden Sie in den genannten Paragraphen der 44. BImSchV. <a href='https://www.gesetze-im-internet.de/bimschv_44/BJNR080410019.html' target='_blank'>Zum Gesetz, 44. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes</a>"},

    {msgid: "hlp_emissionSource", msg: "Die Angabe betrifft eine Emissionsquelle, zum Beispiel einen Schornstein, über den die Abgase der Anlage abgeleitet werden."},        
    {msgid: "hlp_emissionSourceEast", msg: "Bitte geben Sie die Koordinaten nach dem Europäischen Terrestrischen Referenzsystem 1989 (ETRS89) mit UTM (Universale-Transversale Mercatorprojektion) an."},
    {msgid: "hlp_emissionSourceNorth", msg: "Bitte geben Sie die Koordinaten nach dem Europäischen Terrestrischen Referenzsystem 1989 (ETRS89) mit UTM (Universale-Transversale Mercatorprojektion) an."},

    // obsolete?
    {msgid: "hlp_plantBImSchG", msg: "Anlagen, die nach der 4. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes (4. BImSchV) eine Genehmigung brauchen, gelten als „genehmigungsbedürftige Anlagen“. Die 4. BImSchV legt fest, welche Anlagen eine Genehmigung benötigen. (Zum <a href='http://www.gesetze-im-internet.de/bimschv_4_2013/anhang_1.html' target='_blank'>Gesetz</a>"},
    {msgid: "hlp_plantBImSchGnr", msg: "Das Aktenzeichen der Genehmigungsbehörde finden Sie auf dem ersten Genehmigungsbescheid Ihrer Anlage."},

    // especially for Form 31
    {msgid: "hlp_reportcomment", msg: "Bitte geben Sie zum Beispiel an, wann Sie den Bericht übermittelt haben oder wenn keine Messungen stattgefunden haben."},   
    {msgid: "hlp_reportcomment2", msg: "Bitte geben Sie zum Beispiel an, wann Sie den Bericht übermittelt haben."},   
    {msgid: "hlp_measurement.discontinuous.partName", msg: "Bitte geben Sie, auf welche(s) Anlagenteil(e) sich der Bericht bezieht oder ob sich der Bericht auf die gesamte Anlage bezieht."},   
    {msgid: "hlp_measurement.other", msg: "Falls die für Ihren Standort zuständige Immissionsschutzbehörde weitere Dokumente verlangt, können diese hier hochgeladen werden."},   
    {msgid: "hlp_measurement.BImSchV13", msg: "Dies betrifft den Jahresbericht nach § 22 der 13. BImSchV. (<a href='https://www.bmuv.de/gesetz/13-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blanK'>Link</a>)"},            
    {msgid: "hlp_measurement.BImSchV17", msg: "Dies betrifft den Jahresbericht nach § 22 der 17. BImSchV.(<a href='https://www.bmuv.de/gesetz/17-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blank'>Link</a>)"},
    {msgid: "hlp_measurement.BImSchV31", msg: "Dies bezieht sich auf den Bericht zur Lösemittelbilanz, der nach der 31. BImSchV der Behörde auf Verlangen vorzulegen ist. (<a href='https://www.bmuv.de/gesetz/31-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blank'>Link)</a>)"},  
    {msgid: "hlp_measurement.massBalance", msg: "Dies bezieht sich auf eine Berechnung, die der Technischen Anleitung zur Reinhaltung der Luft (TA Luft), Anhang 10, unterliegt. (<a href='https://www.bmuv.de/faqs/technische-anleitung-zur-reinhaltung-der-luft' target='_blank'>Link)</a>)"},  


    {msgid: "hlp_cycleWaste.BImSchG", msg: "Dies betrifft genehmigungsbedürftige Anlagen, zu denen § 5 (1) Nr. 3 BImSchG Vorgaben macht: Abfälle müssen Sie demnach vermeiden, nicht zu vermeidende Abfälle verwerten und nicht zu verwertende Abfälle ohne Beeinträchtigung des Wohls der Allgemeinheit beseitigen. (<a href='https://www.gesetze-im-internet.de/bimschg/__5.html' target='_blanK'>zum Gesetz)</a>)"},  
    {msgid: "hlp_other.ISO14001", msg: "Die internationale Umweltmanagementnorm ist der weltweit akzeptierte und angewendete Standard für Umweltmanagementsysteme. (<a href='https://www.umweltbundesamt.de/themen/wirtschaft-konsum/wirtschaft-umwelt/umwelt-energiemanagement/iso-14001-umweltmanagementsystemnorm#inhalte-der-iso-14001' target='_blank'>Weitere Informationen</a>)<br>Das Eco-Management and Audit Scheme (EMAS), auch EU-Öko-Audit, ist das „Gemeinschaftssystem für Umweltmanagement und Umweltbetriebsprüfung“ der Europäischen Union. (<a href=' https://www.emas.de' target='_blank'>Link)</a>)"},  
    {msgid: "hlp_other.education", msg: "Die Teilnahme an Fortbildungen ist mindestens alle 2 Jahre erforderlich."}, 
    {msgid: "hlp_other.ISO50001", msg: "Dies bezieht sich auf Nachweise nach dem weltweiten Standards ISO 50001 oder 50005 zum Energiemanagementsystem (<a href='https://www.umweltbundesamt.de/energiemanagementsysteme-iso-50001#iso-50001-aufbau-und-anwendung' target='_blank'>Link</a>) oder Angaben zum Bundes-Immissionsschutzgesetz (BImSchG), § 5, Absatz 1, Nummer 4, dass Sie Energie sparsam und effizient verwenden. (<a href='https://www.gesetze-im-internet.de/bimschg/__5.html' target='_blank'>Zum Gesetz</a>)"}, 

    {msgid: "hlp_reportevents", msg: "Ereignisse oder Störungen beeinträchtigen den bestimmungsgemäßen Betrieb der Anlage durch einen oder mehrere Gefahrenstoffe. Alle Ereignisse mit schädlichen Umwelteinwirkungen wie Grenzwert-Überschreitungen oder Leckagen müssen Sie angeben. (<a href='https://www.bmuv.de/gesetz/zwoelfte-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blank'>zum Gesetz</a>)"},  

    {msgid: "hlp_plant.partName", msg: "Zur Anlage gehören auch alle einzelnen Anlagenteile, die für den Betrieb notwendig und gesondert genehmigungsbedürftig wären. Sie erhalten eine zusätzliche Anlagennummer, zählen aber als Bestandteil der übergeordneten genehmigungsbedürftigen Anlage und benötigen damit keine weitere Genehmigung. Dies ist in der Verordnung über genehmigungsbedürftige Anlagen festgehalten: <a href='http://www.gesetze-im-internet.de/bimschv_4_2013/anhang_1.html' target='_blank'> 4. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes (4. BImSchV), § 1, Absatz 4</a>."},
    {msgid: "hlp_plant.operatingUnit", msg: "Die Anlage sowie Anlagenteile sind in Betriebseinheiten unterteilt, die eine oder mehrere gleichartige Teilanlagen, eine oder mehrere gleichartige Anlagenteile oder einen oder mehrere gleichartige Verfahrensabschnitte umfassen können. Bitte geben Sie insbesondere Betriebseinheiten an, die selbstständig Emissionen erzeugen."},
    {msgid: "hlp_plant.operatingUnit12BImSchV", msg: "Dies betrifft Anlagen mit gefährlichen Stoffen und störfallrelevanten Betriebsbereichen, die der 12. Verordnung zur Durchführung des Bundes-Immissionsschutzgesetzes (12. BImSchV) unterliegen. (<a href='https://www.bmuv.de/gesetz/zwoelfte-verordnung-zur-durchfuehrung-des-bundes-immissionsschutzgesetzes' target='_blank'>Link</a>)"},


    {msgid: "hlp_44_new", msg: "Eine Neueinrichtung liegt vor, wenn eine Feuerungsanlage nach dem 20. Dezember 2018 in Betrieb genommen wurde oder in Betrieb genommen werden soll."},
    {msgid: "hlp_44_old", msg: '"Bestehende Anlage" im Sinne dieser Verordnung ist eine Feuerungsanlage, ' + 
                            '<ol><li>die vor dem 20. Dezember 2018 in Betrieb genommen wurde oder' +
                            '<li>für die vor dem 19. Dezember 2017 nach § 4 oder § 16 des Bundes-Immissionsschutzgesetzes eine Genehmigung erteilt wurde, sofern die Anlage spätestens am 20. Dezember 2018 in Betrieb genommen wurde.</ol>' +
                            '<a href="https://www.gesetze-im-internet.de/bimschv_44/__2.html"  target="_blanK">zum Gesetz</a>'},
    {msgid: "hlp_fuelcat1", msg: "ausgenommen Gasöl (Diesel) und Gasöl (Heizöl EL)"},
    {msgid: "hlp_fuelcat2", msg: "ausgenommen Erdgas, Biogas, Klärgas, Deponiegas"},



    {msglng: "en", msgid: "key", msg: "value"}
];
