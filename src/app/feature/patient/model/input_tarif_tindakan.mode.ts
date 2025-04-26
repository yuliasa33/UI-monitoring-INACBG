export namespace INSERTTARIFTINDAKAN {
    export interface HeaderTrans {
        id_register: number
        item_transaksi: ItemTransaksi[]
      }
      
      export interface ItemTransaksi {
        id_tarif_berlaku: number
        id_setup_tarif: number
        id_dokter: number
        doct_disc: number
        id_doct_anas: number
        id_poli: number
        id_kelas_pelayanan: number
        total_tarif: number
        qty: number
        potongan: number
        tdmk_disc: number[]
        discountAmountEach: number[]
        kode_voucher: string
        nominal_voucher: number
      }
      
}