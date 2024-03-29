import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'

import { Kayit } from '../models/kayit';
import { Uye } from '../models/uye';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  private dbKayit = '/Kayitlar';
  private dbUye = '/Uyeler';
  kayitRef: AngularFireList<Kayit> = null;
  uyeRef: AngularFireList<Uye> = null;
  constructor(
  public db: AngularFireDatabase,
  public afAuth: AngularFireAuth

  )
  {
  this.kayitRef = db.list(this.dbKayit);
  this.uyeRef = db.list(this.dbUye);

  }

  OturumAc(mail:string,parola:string){
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }
  OturumKapat(){
    return this.afAuth.signOut();
  }
  OturumKontrol(){
    if (localStorage.getItem("user")) {
      return true;
    }else {
      return false;
    }
  }
  UyeOl(uye:Uye){
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }
  UyeEkle(uye:Uye){
    return this.uyeRef.push(uye);
  }


  KayitListele(){
    return this.kayitRef;
  }
  KayitListeleByUID(uid:string){
    return this.db.list("/Kayitlar",q=>q.orderByChild("uid").equalTo(uid));
  }
  KayitByKey(key:string){
    return this.db.object("/Kayitlar/"+key);
  }
  KayitEkle(kayit:Kayit){
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit:Kayit){
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key:string){
    return this.kayitRef.remove(key);
  }
}
