import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kayit } from 'src/app/models/kayit';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'app-kayitekle',
  templateUrl: './kayitekle.component.html',
  styleUrls: ['./kayitekle.component.css']
})
export class KayitekleComponent implements OnInit {
  secKayit: Kayit = new Kayit();
  constructor(
    public fbServis:FbServisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  Kaydet(){
    var user = JSON.parse(localStorage.getItem("user"));
    this.secKayit.uid = user.uid;
    var tarih=new Date();
    this.secKayit.kayTarih=tarih.getTime().toString();
    this.secKayit.duzTarih=tarih.getTime().toString();
    this.fbServis.KayitEkle(this.secKayit).then(d=>{
    this.router.navigate(['/']);
    });

  }
}
